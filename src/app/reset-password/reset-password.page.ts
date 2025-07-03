import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  IonSpinner
} from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
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
    IonSpinner
  ],
})
export class ResetPasswordPage implements OnInit {
  // Objek untuk menampung data dari form dan URL
  resetData = {
    token: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute, // Untuk membaca parameter URL
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // Ambil 'token' dan 'email' dari query parameter URL saat halaman dimuat
    this.route.queryParamMap.subscribe(params => {
      this.resetData.token = params.get('token') || '';
      this.resetData.email = params.get('email') || '';

      // Jika token atau email tidak ada, mungkin arahkan kembali ke login
      if (!this.resetData.token || !this.resetData.email) {
        this.presentAlert('Error', 'Link reset tidak valid atau kedaluwarsa.', '/login');
      }
    });
  }

  async submitReset() {
    if (this.resetData.password !== this.resetData.password_confirmation) {
      this.errorMessage = 'Konfirmasi password tidak cocok.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const loading = await this.loadingCtrl.create({ message: 'Menyimpan password baru...' });
    await loading.present();

    this.authService.resetPassword(this.resetData).subscribe({
      next: async (response) => {
        await loading.dismiss();
        await this.presentAlert('Sukses', 'Password Anda telah berhasil direset. Silakan login kembali.', '/login');
      },
      error: async (err) => {
        await loading.dismiss();
        this.errorMessage = err.error?.message || 'Gagal mereset password. Token mungkin tidak valid.';
        console.error(err);
      }
    });
  }

  // Fungsi helper untuk menampilkan alert
  async presentAlert(header: string, message: string, navigateTo: string | null = null) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [{
        text: 'OK',
        handler: () => {
          if (navigateTo) {
            this.router.navigateByUrl(navigateTo);
          }
        }
      }]
    });
    await alert.present();
  }
}
