import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bidding-penilaian',
  templateUrl: './bidding-penilaian.page.html',
  styleUrls: ['./bidding-penilaian.page.scss'],
  standalone: false,
})
export class BiddingPenilaianPage {
  hargaBidding: number = 0;
  evaluasi: { status: string, skor: number } | null = null;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  async submitBidding() {
    if (!this.hargaBidding || this.hargaBidding <= 0) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Masukkan harga yang valid.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Simulasi logika evaluasi:
    let skor = 0;
    if (this.hargaBidding < 100000000) skor = 95;
    else if (this.hargaBidding < 120000000) skor = 85;
    else if (this.hargaBidding < 140000000) skor = 75;
    else skor = 60;

    const status = skor >= 80 ? 'Lulus' : 'Tidak Lulus';

    // Simpan ke localStorage (opsional)
    localStorage.setItem('biddingData', JSON.stringify({
      harga: this.hargaBidding,
      skor,
      status
    }));

    this.evaluasi = { skor, status };

    const alert = await this.alertCtrl.create({
      header: 'Bidding Dikirim',
      message: `Harga: Rp${this.hargaBidding.toLocaleString()}<br>Status: ${status}<br>Skor: ${skor}`,
      buttons: ['OK']
    });
    await alert.present();
  }

  kembaliKeDashboard() {
    this.navCtrl.navigateBack('/halaman-utama-vendor');
  }

  ionViewWillEnter() {
    const data = localStorage.getItem('biddingData');
    if (data) {
      this.evaluasi = JSON.parse(data);
    }
  }
}
