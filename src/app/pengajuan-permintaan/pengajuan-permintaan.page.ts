import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { ProcurementService } from '../procurement.service';

@Component({
  selector: 'app-pengajuan-permintaan',
  templateUrl: './pengajuan-permintaan.page.html',
  styleUrls: ['./pengajuan-permintaan.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PengajuanPermintaanPage {

  request = {
    title: '',
    reason: '',
    items: [
      { item_name: '', specification: '', quantity: 1 }
    ]
  };

  constructor(
    private alertController: AlertController,
    private procurementService: ProcurementService,
    private navCtrl: NavController
  ) { }

  addItem() {
    this.request.items.push({ item_name: '', specification: '', quantity: 1 });
  }

  removeItem(index: number) {
    if (this.request.items.length > 1) {
      this.request.items.splice(index, 1);
    }
  }

  submitRequest() {
    this.procurementService.createRequest(this.request).subscribe(
      // Blok sukses (tidak berubah)
      async (res: any) => {
        const alert = await this.alertController.create({
          header: 'Sukses',
          message: 'Pengajuan Anda telah berhasil dikirim.',
          buttons: [{ text: 'OK' }]
        });
        await alert.present();
        this.navCtrl.back();
      },
      // Blok error (DIUBAH)
      async (err: any) => {
        let errorMessage = 'Terjadi kesalahan yang tidak diketahui.';

        // Cek jika ini adalah error validasi dari Laravel (HTTP 422)
        if (err.error && err.error.errors) {
          // Gabungkan semua pesan error validasi menjadi satu string
          errorMessage = Object.values(err.error.errors).flat().join('\n');
        } 
        // Cek untuk pesan error umum lainnya dari Laravel
        else if (err.error && err.error.message) {
          errorMessage = err.error.message;
        }

        const alert = await this.alertController.create({
          header: 'Gagal',
          // Tampilkan pesan error yang lebih detail dari Laravel
          message: errorMessage,
          buttons: [{ text: 'OK' }]
        });
        await alert.present();
      }
    );
  }
}
