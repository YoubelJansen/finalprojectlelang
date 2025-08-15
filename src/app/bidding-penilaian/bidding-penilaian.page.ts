import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule, LoadingController, NavController } from '@ionic/angular';
import { VendorService } from '../vendor.service'; // Pastikan path ini benar
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bidding-penilaian',
  templateUrl: './bidding-penilaian.page.html',
  styleUrls: ['./bidding-penilaian.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BiddingPenilaianPage implements OnInit {
  tenderId: number | null = null;
  tender: any = null;
  myBid: any = null;
  priceOffer: number | null = null;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private vendorService: VendorService
  ) { }

  ngOnInit() {
    // Ambil ID tender dari URL saat halaman dimuat
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tenderId = +id;
      this.loadInitialData();
    } else {
      console.error('Tender ID tidak ditemukan!');
      this.navCtrl.back();
    }
  }

  /**
   * Memuat data awal: detail tender dan status bid yang sudah ada.
   */
  async loadInitialData() {
    const loading = await this.loadingCtrl.create({ message: 'Memuat data...' });
    await loading.present();
    
    this.vendorService.getTenderAndBidStatus(this.tenderId!).subscribe({
      next: (res) => {
        this.tender = res.tender;
        this.myBid = res.bid;
        // Jika vendor sudah pernah memasukkan harga, tampilkan kembali.
        if (this.myBid && this.myBid.price_offer) {
          this.priceOffer = this.myBid.price_offer;
        }
        loading.dismiss();
      },
      error: (err) => {
        loading.dismiss();
        this.presentAlert('Gagal', 'Tidak dapat memuat data tender.');
      }
    });
  }

  /**
   * Fungsi yang dipanggil saat tombol 'Kirim Penawaran Harga' ditekan.
   */
  async submitPrice() {
    if (!this.priceOffer || this.priceOffer <= 0) {
      this.presentAlert('Input Tidak Valid', 'Harga penawaran harus diisi dan lebih besar dari 0.');
      return;
    }
    this.isLoading = true;

    // Panggil service untuk mengirimkan harga ke server Laravel
    this.vendorService.submitBid(this.tenderId!, this.priceOffer).subscribe({
      next: async (res) => {
        this.isLoading = false;
        const alert = await this.alertCtrl.create({
          header: 'Sukses',
          message: 'Harga penawaran Anda telah berhasil dikirim!',
          buttons: [{
            text: 'OK',
            handler: () => {
              // Arahkan vendor kembali ke halaman utama setelah berhasil
              this.router.navigateByUrl('/halaman-utama-vendor');
            }
          }]
        });
        await alert.present();
      },
      error: (err) => {
        this.isLoading = false;
        this.presentAlert('Gagal', err.error?.message || 'Terjadi kesalahan saat mengirim penawaran.');
      }
    });
  }

  /**
   * Fungsi helper untuk menampilkan popup.
   */
  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
