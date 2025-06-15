import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { VendorService } from '../vendor.service'; // Sesuaikan path jika berbeda
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
  tenderData: any = null; // Variabel untuk menyimpan data tender

  constructor(
    private vendorService: VendorService,
    private alertCtrl: AlertController,
    private router: Router,
    private navCtrl: NavController
  ) {
    // Tangkap data 'tender' yang dikirim dari halaman sebelumnya
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
        // Tampilkan error jika gagal memuat profil
        this.presentErrorAlert('Gagal memuat profil. Pastikan Anda sudah login sebagai Vendor.');
      }
    });
  }

  saveProfile() {
    // Hapus properti yang tidak perlu dikirim saat update
    const { id, user_id, created_at, updated_at, ...profileData } = this.profile;
    
    this.vendorService.updateProfile(profileData).subscribe({
      next: async (res: any) => {
        await this.presentSuccessAlert();

        // Cek jika kita sedang dalam alur penawaran tender
        if (this.tenderData) {
          // Jika ya, arahkan ke halaman 'pengajuan-penawaran' sambil membawa data tender
          this.router.navigateByUrl('/pengajuan-penawaran', { state: { tender: this.tenderData } });
        } else {
          // Jika tidak (hanya edit profil biasa), kembali ke halaman sebelumnya
          this.navCtrl.back();
        }
      },
      error: (err: any) => {
        this.presentErrorAlert('Gagal menyimpan profil. Pastikan semua kolom terisi dengan benar.');
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
