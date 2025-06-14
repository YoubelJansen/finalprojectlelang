import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavController, AlertController, IonicModule } from '@ionic/angular';
import { AdminService } from '../admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buat-tender',
  templateUrl: './buat-tender.page.html',
  styleUrls: ['./buat-tender.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterModule]
})
export class BuatTenderPage implements OnInit {
  request: any;
  requestTitle = 'Memuat...';
  tender = {
    procurement_request_id: null,
    description: '',
    submission_deadline: new Date().toISOString()
  };

  constructor(
    private router: Router,
    private adminService: AdminService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    // Mengambil data dari navigasi dengan aman
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { request: any };
    if (state && state.request) {
      this.request = state.request;
      this.requestTitle = this.request.title;
      this.tender.procurement_request_id = this.request.id;
    }
  }

  ngOnInit() {
    // Jika state tidak ditemukan (misalnya saat refresh halaman), arahkan kembali
      if (!this.request) {
      this.navCtrl.back();
    }
  }

  publishTender() {
    this.adminService.createTender(this.tender).subscribe({
      next: async (res: any) => {
        const alert = await this.alertCtrl.create({
          header: 'Sukses',
          message: 'Tender berhasil dipublikasikan!',
          buttons: [{ text: 'OK' }]
        });
        await alert.present();
        // Arahkan ke halaman riwayat tender setelah berhasil
        this.router.navigateByUrl('/riwayat', { replaceUrl: true });
      },
      error: async (err: any) => {
        const alert = await this.alertCtrl.create({
          header: 'Gagal',
          message: err.error.message || 'Terjadi kesalahan saat mempublikasikan tender.',
          buttons: [{ text: 'OK' }]
        });
        await alert.present();
      }
    });
  }
}
