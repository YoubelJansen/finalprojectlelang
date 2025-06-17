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
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  onLogin() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe(
      (res: any) => {
        // Panggil fungsi navigasi berdasarkan peran dari respons
        this.navigateByRole(res.user.role);
      },
      (err: any) => {
        // Jika gagal, tampilkan pesan error
        this.presentAlert('Login Gagal', err.error?.message || 'Email atau password yang Anda masukkan salah.');
      }
    );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
 
  navigateByRole(role: string) {
    // Tentukan halaman utama untuk setiap peran
    switch (role) {
        case 'admin':
            this.router.navigate(['/halamanutama']); 
            break;
        // PERBAIKAN DI SINI: Samakan dengan nama role di database
        case 'supervisor': 
            this.router.navigate(['/halaman-utama-atasan']);
            break;
        // PERBAIKAN DI SINI: Samakan dengan nama role di database
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

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [{ text: 'OK' }],
    });
    await alert.present();
  }
}
