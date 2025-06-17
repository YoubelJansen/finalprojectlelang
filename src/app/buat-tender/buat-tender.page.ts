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
  request: any; // Data pengajuan dari halaman sebelumnya
  
  // PERBAIKAN: Inisialisasi objek tender dengan properti yang jelas
  tender = {
    procurement_request_id: null,
    title: '', // <-- Variabel untuk judul tender
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
      // Otomatis isi data dari pengajuan
      this.tender.procurement_request_id = this.request.id;
      this.tender.title = `Tender untuk: ${this.request.title}`; // Contoh pengisian otomatis
      this.tender.description = this.request.reason; // Contoh pengisian otomatis
    }
  }

  ngOnInit() {
    if (!this.request) {
      this.navCtrl.back();
    }
  }

  publishTender() {
    // Objek tender sekarang sudah berisi data dari form
    this.adminService.createTender(this.tender).subscribe({
      next: async (res: any) => {
        const alert = await this.alertCtrl.create({
          header: 'Sukses',
          message: 'Tender berhasil dipublikasikan!',
          buttons: [{
            text: 'OK',
            handler: () => {
              // Arahkan ke halaman riwayat setelah berhasil
              this.router.navigateByUrl('/riwayat', { replaceUrl: true });
            }
          }]
        });
        await alert.present();
      },
      error: async (err: any) => {
        // Menampilkan pesan error yang lebih spesifik dari server
        const message = err.error?.errors ? Object.values(err.error.errors).join(', ') : (err.error?.message || 'Terjadi kesalahan.');
        const alert = await this.alertCtrl.create({
          header: 'Gagal',
          message: message,
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}
