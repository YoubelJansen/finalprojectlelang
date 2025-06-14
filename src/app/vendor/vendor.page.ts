import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { VendorService } from '../vendor.service'; // Sesuaikan path

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.page.html',
  styleUrls: ['./vendor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VendorPage { // Kita anggap ini adalah halaman Profil Vendor
  profile: any = {};
  isLoading = true;

  constructor(
    private vendorService: VendorService,
    private alertCtrl: AlertController
  ) { }

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
      // BLOK INI AKAN MENANGANI ERROR
      error: async (err: any) => {
        this.isLoading = false;
        const alert = await this.alertCtrl.create({
          header: 'Akses Ditolak',
          message: 'Anda harus login sebagai Vendor untuk mengakses halaman ini.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  saveProfile() {
    const { user_id, created_at, updated_at, ...profileData } = this.profile;
    this.vendorService.updateProfile(profileData).subscribe(async res => {
      const alert = await this.alertCtrl.create({
        header: 'Sukses',
        message: 'Profil berhasil diperbarui.',
        buttons: ['OK']
      });
      await alert.present();
    });
  }
}
