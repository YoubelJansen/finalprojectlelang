import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pengajuan-permintaan',
  templateUrl: './pengajuan-permintaan.page.html',
  styleUrls: ['./pengajuan-permintaan.page.scss'],
  standalone: false,
})
export class PengajuanPermintaanPage {
  form = {
    item: '',
    spesifikasi: '',
    kuantitas: null,
    alasan: ''
  };

  constructor(private alertController: AlertController) {}

  async submitForm() {
    if (!this.form.item || !this.form.spesifikasi || !this.form.kuantitas || !this.form.alasan) {
      const alert = await this.alertController.create({
        header: 'Gagal',
        message: 'Semua field wajib diisi!',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Berhasil',
      message: 'Permintaan telah diajukan.',
      buttons: ['OK']
    });
    await alert.present();

    // Reset form setelah submit
    this.form = {
      item: '',
      spesifikasi: '',
      kuantitas: null,
      alasan: ''
    };
  }
}
