import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { VendorService } from '../vendor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.page.html',
  styleUrls: ['./vendor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VendorPage implements OnInit {
  profile: any = {};
  isLoading = true;
  tenderData: any = null;

  constructor(
    private vendorService: VendorService,
    private alertCtrl: AlertController,
    private router: Router,
    private navCtrl: NavController
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { tender: any };
    if (state && state.tender) {
      this.tenderData = state.tender;
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadProfile();
  }

  loadProfile() {
    this.isLoading = true;
    this.vendorService.getProfile().subscribe({
      next: (res: any) => {
        this.profile = res;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.presentErrorAlert('Gagal memuat profil. Pastikan Anda sudah login sebagai Vendor.');
      }
    });
  }

  saveProfile() {
    const { id, user_id, created_at, updated_at, ...profileData } = this.profile;
    
    this.vendorService.updateProfile(profileData).subscribe({
      next: async (res: any) => {
        await this.presentSuccessAlert();
        if (this.tenderData) {
          this.router.navigateByUrl('/pengajuan-penawaran', { state: { tender: this.tenderData } });
        } else {
          this.navCtrl.back();
        }
      },
      // BLOK INI AKAN MENANGANI & MENAMPILKAN ERROR DARI LARAVEL
      error: async (err: any) => {
        let errorMessage = 'Terjadi kesalahan. Periksa kembali data Anda.';
        // Cek jika ini adalah error validasi dari Laravel (HTTP 422)
        if (err.error && err.error.errors) {
          // Gabungkan semua pesan error validasi menjadi satu string
          errorMessage = Object.values(err.error.errors).flat().join('\n');
        }
        this.presentErrorAlert(errorMessage);
      }
    });
  }

  async presentSuccessAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Sukses',
      message: 'Profil berhasil diperbarui.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentErrorAlert(message: string) {
    const alert = await this.alertCtrl.create({
        header: 'Error',
        message: message,
        buttons: ['OK']
    });
    await alert.present();
  }
}
