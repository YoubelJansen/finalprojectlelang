import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pengajuan-penawaran',
  templateUrl: './pengajuan-penawaran.page.html',
  styleUrls: ['./pengajuan-penawaran.page.scss'],
  standalone:false, 
})
export class PengajuanPenawaranPage {
  dokumen: any = {
    administrasi: null,
    teknis: null,
    harga: null
  };

  constructor(private navCtrl: NavController) {}

  handleFileInput(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      this.dokumen[type] = file;
    }
  }

  isFormValid() {
    return this.dokumen.administrasi && this.dokumen.teknis && this.dokumen.harga;
  }

  submitPenawaran() {
    // Simpan dummy ke localStorage sebagai placeholder untuk dashboard admin
    const existing = JSON.parse(localStorage.getItem('penawaranList') || '[]');
    existing.push({
      id: Date.now(),
      dokumen: this.dokumen,
      status: 'Diajukan',
      waktu: new Date().toISOString()
    });
    localStorage.setItem('penawaranList', JSON.stringify(existing));

    // Arahkan kembali ke dashboard atau tampilkan alert
    alert('Penawaran berhasil dikirim!');
    this.navCtrl.navigateBack('/dashboard-vendor');
  }
}
