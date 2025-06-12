import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // <-- Tambahkan RouterModule
import { AuthService } from '../auth.service';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, // <-- KEMBALIKAN JADI TRUE
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule, // <-- TAMBAHKAN INI (untuk routerLink)
  ],
})
export class LoginPage {
  // ... (Sisa kode dari constructor sampai akhir tidak berubah, sudah benar) ...
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
        this.navigateByRole(res.user.role);
      },
      (err: any) => {
        this.presentAlert('Login Gagal', 'Email atau password yang Anda masukkan salah.');
      }
    );
  }
  
navigateByRole(role: string) {
    // Tentukan halaman utama untuk setiap role
    switch (role) {
        case 'admin':
            this.router.navigate(['/halamanutama']); // <-- DIUBAH KE SINI
            break;
        case 'atasan':
            this.router.navigate(['/halaman-utama-atasan']);
            break;
        case 'karyawan':
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