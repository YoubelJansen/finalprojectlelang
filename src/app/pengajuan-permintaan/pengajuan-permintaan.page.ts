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
      // PERBAIKAN DI DUA BARIS INI
      async (res: any) => {
        const alert = await this.alertController.create({
          header: 'Sukses',
          message: 'Pengajuan Anda telah berhasil dikirim.',
          buttons: [{ text: 'OK' }]
        });
        await alert.present();
        this.navCtrl.back();
      },
      async (err: any) => {
        const alert = await this.alertController.create({
          header: 'Gagal',
          message: 'Gagal mengirim pengajuan. Pastikan semua kolom terisi.',
          buttons: [{ text: 'OK' }]
        });
        await alert.present();
      }
    );
  }
}