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
    title: '',
    description: '',
    submission_deadline: new Date().toISOString()
  };

  constructor(
    private router: Router,
    private adminService: AdminService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { request: any };
    if (state && state.request) {
      this.request = state.request;
      this.requestTitle = this.request.title;
      this.tender.procurement_request_id = this.request.id;
    }
  }

  ngOnInit() {
    if (!this.request) {
      this.navCtrl.back();
    }
  }

  private formatDateToMySQL(datetime: string): string {
    const date = new Date(datetime);
    const pad = (n: number) => n.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  async publishTender() {
    if (!this.tender.title || !this.tender.description || !this.tender.submission_deadline) {
      const alert = await this.alertCtrl.create({
        header: 'Gagal',
        message: 'Harap lengkapi semua field sebelum mempublikasikan tender.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const tenderPayload = {
      ...this.tender,
      submission_deadline: this.formatDateToMySQL(this.tender.submission_deadline)
    };

    this.adminService.createTender(tenderPayload).subscribe({
      next: async (res: any) => {
        const alert = await this.alertCtrl.create({
          header: 'Sukses',
          message: 'Tender berhasil dipublikasikan!',
          buttons: [{ text: 'OK' }]
        });
        await alert.present();
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
