// src/app/pages/forgot-password/forgot-password.page.ts

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertController, IonicModule } from '@ionic/angular'; // <-- Tambahkan IonicModule
import { CommonModule } from '@angular/common'; // <-- Tambahkan CommonModule
import { FormsModule } from '@angular/forms'; // <-- Tambahkan FormsModule

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true, // <-- Pastikan ini ada
  imports: [
    IonicModule, // <-- Tambahkan ini
    CommonModule, // <-- Tambahkan ini
    FormsModule, // <-- Tambahkan ini (PENTING untuk ngModel)
  ],
})
export class ForgotPasswordPage {
  email: string = '';

  constructor(
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  requestReset() {
    // ... (sisa kode Anda sama)
    this.authService.forgotPassword({ email: this.email }).subscribe(
      res => {
        this.presentAlert('Sukses', 'Link reset password telah dikirim ke email Anda.');
      },
      err => {
        this.presentAlert('Error', err.error.message || 'Terjadi kesalahan.');
      }
    );
  }

  async presentAlert(header: string, message: string) {
    // ... (sisa kode Anda sama)
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}