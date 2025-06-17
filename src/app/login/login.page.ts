import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 
import { AuthService } from '../auth.service';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, 
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule, 
  ],
})
export class LoginPage {
  // Menggunakan satu objek untuk menampung kredensial, lebih rapi
  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  /**
   * Fungsi yang dipanggil saat tombol Login ditekan.
   */
  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: (res: any) => {
        // Simpan token & data user ke localStorage
        localStorage.setItem('auth_token', res.access_token);
        localStorage.setItem('user', JSON.stringify(res.user));
        // Panggil fungsi navigasi berdasarkan peran dari respons server
        this.navigateByRole(res.user.role);
      },
      error: (err: any) => {
        // Tampilkan pesan error dari server untuk informasi yang lebih akurat
        this.presentAlert('Login Gagal', err.error?.message || 'Email atau password yang Anda masukkan salah.');
      }
    });
  }

  /**
   * Fungsi untuk pindah ke halaman registrasi.
   */
  goToRegister() {
    this.router.navigate(['/register']);
  }
 
  /**
   * Mengarahkan pengguna ke halaman yang sesuai berdasarkan perannya.
   */
  navigateByRole(role: string) {
    switch (role) {
        case 'admin':
            this.router.navigate(['/halamanutama']); 
            break;
        case 'supervisor': 
            this.router.navigate(['/halaman-utama-atasan']);
            break;
        case 'employee':
            this.router.navigate(['/halaman-utama-karyawan']);
            break;
        case 'vendor':
            this.router.navigate(['/halaman-utama-vendor']);
            break;
        default:
            this.router.navigate(['/home']); // Halaman fallback
            break;
    }
  }

  /**
   * Fungsi helper untuk menampilkan popup alert.
   */
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [{ text: 'OK' }],
    });
    await alert.present();
  }
}
