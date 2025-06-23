import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service'; // Pastikan path service Anda benar
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap, of } from 'rxjs'; // Import operator RxJS

@Component({
  selector: 'app-kelola-vendor',
  templateUrl: './kelola-vendor.page.html',
  styleUrls: ['./kelola-vendor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class KelolaVendorPage implements OnInit {
  tender: any = null;
  isLoading = true; // State untuk loading spinner
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
    // Memuat ulang data setiap kali halaman kembali aktif
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
          // Jika ada ID, panggil service
          return this.adminService.getTenderDetails(+id);
        }
        // Jika tidak ada ID, kembalikan null untuk ditangani di subscribe
        return of(null);
      })
    ).subscribe({
      next: (res: any) => {
        if (res) {
          this.tender = res;
          // Pengecekan keamanan: hanya proses jika ada jadwal aanwijzing
          if (res.aanwijzing) {
            // Logika konversi waktu Anda sudah benar untuk input datetime-local
            const date = new Date(res.aanwijzing.schedule_time);
            const timezoneOffset = date.getTimezoneOffset() * 60000;
            const localISOTime = new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
            
            this.aanwijzingData = {
              schedule_time: localISOTime,
              meeting_link: res.aanwijzing.meeting_link,
              description: res.aanwijzing.description
            };
          }
        } else {
          // Handle jika tidak ada ID di URL
          this.presentAlert('Error', 'Tender ID tidak ditemukan.');
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
    
    // Pastikan kita punya ID tender sebelum menyimpan
    const tenderId = this.tender?.id;
    if (!tenderId) {
        this.presentAlert('Error', 'Tidak bisa menyimpan jadwal karena ID Tender tidak valid.');
        return;
    }

    this.adminService.scheduleAanwijzing(tenderId, this.aanwijzingData).subscribe({
      next: async (res: any) => {
        await this.presentAlert('Sukses', 'Jadwal Aanwijzing berhasil disimpan!');
        this.loadTenderDetails(); // Muat ulang untuk menampilkan data terbaru
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