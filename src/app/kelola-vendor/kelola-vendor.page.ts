import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service'; // Pastikan path service Anda benar
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kelola-vendor',
  templateUrl: './kelola-vendor.page.html',
  styleUrls: ['./kelola-vendor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class KelolaVendorPage implements OnInit {
  tenderId: number | null = null;
  tender: any = null;
  aanwijzingData = {
    schedule_time: '',
    meeting_link: '',
    description: ''
  };

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.tenderId = +this.route.snapshot.paramMap.get('id')!;
    if (this.tenderId) {
      this.loadTenderDetails();
    }
  }

  async loadTenderDetails() {
    const loading = await this.loadingCtrl.create({ message: 'Memuat data...' });
    await loading.present();

    this.adminService.getTenderDetails(this.tenderId!).subscribe({
      next: (res: any) => {
        this.tender = res;
        if (res.aanwijzing) {
          const date = new Date(res.aanwijzing.schedule_time);
          const timezoneOffset = date.getTimezoneOffset() * 60000;
          const localISOTime = new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
          
          this.aanwijzingData = {
            schedule_time: localISOTime,
            meeting_link: res.aanwijzing.meeting_link,
            description: res.aanwijzing.description
          };
        }
        loading.dismiss();
      },
      error: (err: any) => {
        loading.dismiss();
        this.presentAlert('Gagal', 'Gagal memuat detail tender.');
      }
    });
  }

  async saveAanwijzing() {
    if (!this.aanwijzingData.schedule_time || !this.aanwijzingData.meeting_link) {
      this.presentAlert('Input Tidak Lengkap', 'Mohon isi tanggal, waktu, dan link meeting.');
      return;
    }

    this.adminService.scheduleAanwijzing(this.tenderId!, this.aanwijzingData).subscribe({
      next: async (res: any) => {
        await this.presentAlert('Sukses', 'Jadwal Aanwijzing berhasil disimpan!');
        this.loadTenderDetails();
      },
      error: (err: any) => {
        this.presentAlert('Gagal', err.error?.message || 'Gagal menyimpan jadwal.');
      }
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
