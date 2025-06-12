import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // <-- Tambahkan RouterModule
import { AuthService } from '../auth.service';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true, // <-- KEMBALIKAN JADI TRUE
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule, // <-- TAMBAHKAN INI (untuk routerLink)
  ],
})
export class RegisterPage {
  // ... (Sisa kode dari constructor sampai akhir tidak berubah, sudah benar) ...
  name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  role: string = 'karyawan';

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  onRegister() {
    if (this.password !== this.password_confirmation) {
      this.presentAlert('Error', 'Password dan Konfirmasi Password tidak cocok.');
      return;
    }
    
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation,
      role: this.role
    };

    this.authService.register(userData).subscribe(
      (res: any) => {
        this.presentAlert('Sukses', 'Registrasi berhasil! Silakan login.');
        this.router.navigate(['/login']);
      },
      (err: any) => {
        const errors = err.error;
        let message = 'Terjadi kesalahan.';
        if (errors && typeof errors === 'object') {
            message = Object.values(errors).flat().join('\n');
        }
        this.presentAlert('Error Registrasi', message);
      }
    );
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