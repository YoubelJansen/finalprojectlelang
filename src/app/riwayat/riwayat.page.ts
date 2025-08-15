import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service'; // Pastikan path ini benar
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular'; // 1. Import AlertController
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-riwayat',
  templateUrl: './riwayat.page.html',
  styleUrls: ['./riwayat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class RiwayatPage implements OnInit {
  tenders: any[] = [];
  isLoading = true;

  // 2. Inject Router dan AlertController di constructor
  constructor(
    private adminService: AdminService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.loadTenders();
  }

  ionViewWillEnter() {
    this.loadTenders();
  }

  loadTenders() {
    this.isLoading = true;
    this.adminService.getTenders().subscribe({
      next: (res: any[]) => {
        this.tenders = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Gagal memuat riwayat tender:', err);
        this.isLoading = false;
      }
    });
  }

  /**
   * 3. Fungsi baru untuk menampilkan Alert dan melakukan navigasi.
   */
  async goToDetail(tender: any) {
    if (tender && tender.id) {
      // Tampilkan Alert untuk konfirmasi sebelum pindah halaman
      const alert = await this.alertCtrl.create({
        header: 'Konfirmasi Navigasi',
        message: `Anda akan membuka detail untuk Tender ID: ${tender.id}. Lanjutkan?`,
        buttons: [
          {
            text: 'Batal',
            role: 'cancel',
          },
          {
            text: 'Lanjutkan',
            handler: () => {
              // Jika 'Lanjutkan' diklik, baru lakukan navigasi
              this.router.navigate(['/kelola-vendor', tender.id]);
            }
          }
        ]
      });
      await alert.present();
    } else {
      // Jika ID tidak ada, tampilkan alert error
      const errorAlert = await this.alertCtrl.create({
        header: 'Error',
        message: 'ID Tender tidak ditemukan pada data yang diklik.',
        buttons: ['OK']
      });
      await errorAlert.present();
    }
  }
}
