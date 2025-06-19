import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service'; // Pastikan path ini benar
import { AlertController, LoadingController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-penetapan-pemenang-po',
  templateUrl: './penetapan-pemenang-po.page.html',
  styleUrls: ['./penetapan-pemenang-po.page.scss'],
  standalone: true, // Diatur sebagai standalone
  imports: [IonicModule, CommonModule]
})
export class PenetapanPemenangPoPage implements OnInit {
  tenderId: number | null = null;
  tender: any = null;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.tenderId = +this.route.snapshot.paramMap.get('id')!;
    if (this.tenderId) this.loadTenderDetails();
  }

  ionViewWillEnter() {
    // Muat ulang data setiap kali halaman dibuka
    if(this.tenderId) this.loadTenderDetails();
  }

  async loadTenderDetails() {
    const loading = await this.loadingCtrl.create({ message: 'Memuat data penawaran...' });
    await loading.present();
    this.adminService.getTenderDetails(this.tenderId!).subscribe({
      next: (res:any) => { this.tender = res; loading.dismiss(); },
      error: (err:any) => { loading.dismiss(); console.error(err); }
    });
  }

  async confirmSetWinner(bid: any) {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi Pemenang',
      message: `Anda yakin ingin menetapkan ${bid.vendor.company_name} sebagai pemenang tender ini? Tindakan ini akan menyelesaikan tender dan tidak dapat diurungkan.`,
      buttons: [
        { text: 'Batal', role: 'cancel' },
        { text: 'Ya, Tetapkan Pemenang', handler: () => this.setWinner(bid.id) }
      ]
    });
    await alert.present();
  }

  async setWinner(bidId: number) {
    const loading = await this.loadingCtrl.create({ message: 'Memproses...' });
    await loading.present();

    this.adminService.setWinner(this.tenderId!, bidId).subscribe({
      next: async (res:any) => {
        loading.dismiss();
        const successAlert = await this.alertCtrl.create({
          header: 'Sukses', message: res.message, buttons: ['OK']
        });
        await successAlert.present();
        this.loadTenderDetails(); // Refresh data untuk menunjukkan pemenang
      },
      error: async (err:any) => {
        loading.dismiss();
        const errorAlert = await this.alertCtrl.create({
          header: 'Gagal', message: err.error?.message || 'Terjadi kesalahan.', buttons: ['OK']
        });
        await errorAlert.present();
      }
    });
  }
}
