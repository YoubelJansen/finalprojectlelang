import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap, of } from 'rxjs';

@Component({
  selector: 'app-kelola-vendor',
  templateUrl: './kelola-vendor.page.html',
  styleUrls: ['./kelola-vendor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class KelolaVendorPage implements OnInit {
  tender: any = null;
  isLoading = true;
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
    this.loadTenderDetails();
  }

  ionViewWillEnter() {
    this.loadTenderDetails();
  }

  async loadTenderDetails() {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({ message: 'Memuat data...' });
    await loading.present();

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.adminService.getTenderDetails(+id);
        }
        return of(null);
      })
    ).subscribe({
      next: (res: any) => {
        if (res) {
          this.tender = res;
          if (res.aanwijzing) {
            this.aanwijzingData = { ...res.aanwijzing };
          }
        }
        loading.dismiss();
        this.isLoading = false;
      },
      error: (err: any) => {
        loading.dismiss();
        this.isLoading = false;
        this.presentAlert('Gagal', 'Gagal memuat detail tender.');
      }
    });
  }

  async saveAanwijzing() {
    if (!this.aanwijzingData.schedule_time || !this.aanwijzingData.meeting_link) {
      this.presentAlert('Input Tidak Lengkap', 'Mohon isi tanggal, waktu, dan link meeting.');
      return;
    }
    
    if (!this.tender?.id) {
        this.presentAlert('Error', 'Tidak bisa menyimpan jadwal karena ID Tender tidak valid.');
        return;
    }

    this.adminService.scheduleAanwijzing(this.tender.id, this.aanwijzingData).subscribe({
      next: async (res: any) => {
        await this.presentAlert('Sukses', 'Jadwal Aanwijzing berhasil disimpan!');
        this.loadTenderDetails();
      },
      error: (err: any) => {
        this.presentAlert('Gagal', err.error?.message || 'Gagal menyimpan jadwal.');
      }
    });
  }

  openDocument(path: string | null) {
    if (!path) {
      this.presentAlert('Informasi', 'Vendor ini belum mengunggah dokumen tersebut.');
      return;
    }
    const baseUrl = 'http://localhost:8000/storage/';
    window.open(baseUrl + path, '_blank');
  }

  async confirmSetWinner(bid: any) {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi Pemenang',
      message: `Anda yakin ingin menetapkan <strong>${bid.vendor?.company_name}</strong> sebagai pemenang?`,
      buttons: [
        { text: 'Batal', role: 'cancel' },
        { text: 'Ya, Tetapkan', handler: () => this.setWinner(bid.id) }
      ]
    });
    await alert.present();
  }

  async setWinner(bidId: number) {
    if (!this.tender?.id) return;
    this.adminService.setWinner(this.tender.id, bidId).subscribe({
      next: async (res: any) => {
        await this.presentAlert('Sukses', res.message);
        this.loadTenderDetails();
      },
      error: (err: any) => {
        this.presentAlert('Gagal', err.error?.message || 'Gagal menetapkan pemenang.');
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