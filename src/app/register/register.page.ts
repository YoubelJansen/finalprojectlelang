import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class RegisterPage {
  // Objek untuk menampung data dari form, dengan 'employee' sebagai peran default
  regData = { 
    role: 'employee', 
    name: '', 
    email: '', 
    password: '', 
    password_confirmation: '' 
  };

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private alertCtrl: AlertController
  ) { }

  /**
   * Fungsi yang dipanggil saat tombol REGISTER ditekan.
   */
  async register() {
    // Validasi sederhana untuk memastikan password dan konfirmasi password cocok
    if (this.regData.password !== this.regData.password_confirmation) {
      this.presentAlert('Registrasi Gagal', 'Password dan Konfirmasi Password tidak cocok.');
      return;
    }

    // Panggil service untuk mengirim data registrasi ke backend
    this.authService.register(this.regData).subscribe({
      next: (res) => {
        // Jika registrasi sukses, simpan token & data user, lalu arahkan ke halaman yang sesuai
        localStorage.setItem('auth_token', res.access_token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigateByUrl(res.redirectUrl, { replaceUrl: true });
      },
      error: (err) => {
        // Jika gagal, tampilkan pesan error dari server
        this.presentAlert('Registrasi Gagal', err.error?.message || 'Terjadi kesalahan pada server.');
      }
    });
  }

  /**
   * Fungsi untuk navigasi ke halaman login saat segmen 'LOGIN' diklik.
   */
  goToLogin() {
    this.router.navigate(['/login']);
  }

  /**
   * Fungsi helper untuk menampilkan popup alert.
   */
  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
