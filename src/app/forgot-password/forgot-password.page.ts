import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonSpinner,
  IonBackButton,
  IonButtons
} from '@ionic/angular/standalone';
// --- FIX 1: Path impor diperbaiki ---
import { AuthService } from '../auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonSpinner,
    IonBackButton,
    IonButtons
  ],
})
export class ForgotPasswordPage {
  email: string = '';
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  async submitRequest() {
    if (!this.email) {
      this.errorMessage = 'Alamat email wajib diisi.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const loading = await this.loadingCtrl.create({
      message: 'Mengirim permintaan...',
    });
    await loading.present();

    this.authService.forgotPassword(this.email).subscribe({
      // --- FIX 2: Menambahkan tipe data 'any' pada parameter ---
      next: async (response: any) => {
        this.isLoading = false;
        await loading.dismiss();
        await this.presentSuccessAlert();
      },
      // --- FIX 3: Menambahkan tipe data 'any' pada parameter ---
      error: async (err: any) => {
        this.isLoading = false;
        await loading.dismiss();
        if (err.status === 422) {
          this.errorMessage = 'Email tidak ditemukan atau tidak valid.';
        } else {
          this.errorMessage = 'Terjadi kesalahan pada server. Silakan coba lagi nanti.';
        }
        console.error(err);
      },
    });
  }

  async presentSuccessAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Permintaan Terkirim',
      message: 'Jika email Anda terdaftar, kami telah mengirimkan link untuk mereset password Anda. Silakan periksa inbox Anda.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await alert.present();
  }
}
