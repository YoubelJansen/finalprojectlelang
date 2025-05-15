import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-buat-tender',
  templateUrl: './buat-tender.page.html',
  styleUrls: ['./buat-tender.page.scss'],
  standalone: false,
})
export class BuatTenderPage {
  nama = '';
  spesifikasi = '';
  kuantitas = '';
  alasan = '';

  constructor(private router: Router, private alertCtrl: AlertController) {}

  async ajukanTender() {
    if (!this.nama || !this.spesifikasi || !this.kuantitas || !this.alasan) {
      const alert = await this.alertCtrl.create({
        header: 'Gagal',
        message: 'Semua kolom harus diisi!',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }
    
    const timestamp = new Date().toLocaleString();
    const data = `${this.nama}~${this.spesifikasi}~${this.kuantitas}~${this.alasan}`;
    const existing = localStorage.getItem('tenders');
    const updated = existing ? existing + '|' + data : data;
    localStorage.setItem('tenders', updated);

    const alert = await this.alertCtrl.create({
      header: 'Sukses',
      message: 'Tender berhasil diajukan.',
      buttons: ['OK'],
    });
    await alert.present();

    this.router.navigate(['/halamanutama']);
  }
}
