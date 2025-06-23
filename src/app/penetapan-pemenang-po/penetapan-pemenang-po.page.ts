import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service'; // Pastikan path ini benar
import { AlertController, LoadingController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-penetapan-pemenang-po',
  templateUrl: './penetapan-pemenang-po.page.html',
  styleUrls: ['./penetapan-pemenang-po.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PenetapanPemenangPoPage implements OnInit {
  // Tidak perlu tenderId terpisah, kita bisa langsung ambil data
  tender: any = null;
  isLoading = true; // Tambahkan state loading

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController // LoadingController masih berguna untuk aksi setWinner
  ) {}

  ngOnInit() {
    this.loadTenderDetails();
  }

  ionViewWillEnter() {
    // Tidak perlu memanggil load lagi di sini karena ngOnInit sudah cukup
    // Jika Anda ingin data selalu refresh saat kembali ke halaman ini,
    // maka pemanggilan di sini bisa dipertahankan. Tapi untuk awal, kita sederhanakan.
  }

  /**
   * Cara yang lebih modern dan aman untuk memuat data berdasarkan parameter URL.
   */
  loadTenderDetails() {
    this.isLoading = true;
    
    // Menggunakan pipe untuk mengambil ID dari URL lalu memanggil service
    this.route.paramMap.pipe(
      switchMap(params => {
        const tenderId = params.get('id');
        if (tenderId) {
          // Jika ada ID, panggil service untuk mengambil data tender
          return this.adminService.getTenderDetails(+tenderId);
        } else {
          // Jika tidak ada ID, kembalikan observable kosong untuk mencegah error
          return of(null); 
        }
      })
    ).subscribe({
      next: (data: any) => {
        if (data) {
          this.tender = data;
        } else {
          // Handle kasus di mana ID tidak ada atau data tidak ditemukan
          console.error("Tender tidak ditemukan atau ID tidak valid.");
          // Anda bisa menambahkan navigasi kembali atau menampilkan pesan error di sini
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error("Gagal memuat detail tender:", err);
        this.isLoading = false;
        // Tampilkan pesan error kepada pengguna
      }
    });
  }

  async confirmSetWinner(bid: any) {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi Pemenang',
      message: `Anda yakin ingin menetapkan <strong>${bid.vendor.company_name}</strong> sebagai pemenang?`,
      buttons: [
        { text: 'Batal', role: 'cancel' },
        { 
          text: 'Ya, Tetapkan', 
          handler: () => {
            // Kita butuh ID tender di sini, yang bisa kita ambil dari objek tender
            if (this.tender && this.tender.id) {
              this.setWinner(this.tender.id, bid.id);
            } else {
              console.error("ID Tender tidak valid saat mencoba menetapkan pemenang.");
            }
          } 
        }
      ]
    });
    await alert.present();
  }

  async setWinner(tenderId: number, bidId: number) {
    const loading = await this.loadingCtrl.create({ message: 'Memproses...' });
    await loading.present();

    this.adminService.setWinner(tenderId, bidId).subscribe({
      next: async (res: any) => {
        await loading.dismiss();
        const successAlert = await this.alertCtrl.create({
          header: 'Sukses',
          message: res.message,
          buttons: ['OK']
        });
        await successAlert.present();
        this.loadTenderDetails(); // Muat ulang data untuk menampilkan status baru
      },
      error: async (err: any) => {
        await loading.dismiss();
        const errorAlert = await this.alertCtrl.create({
          header: 'Gagal',
          message: err.error?.message || 'Terjadi kesalahan.',
          buttons: ['OK']
        });
        await errorAlert.present();
      }
    });
  }
}
