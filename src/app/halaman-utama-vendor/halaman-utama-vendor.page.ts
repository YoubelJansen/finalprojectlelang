import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-halaman-utama-vendor',
  templateUrl: './halaman-utama-vendor.page.html',
  styleUrls: ['./halaman-utama-vendor.page.scss'],
  standalone: false,
})
export class HalamanUtamaVendorPage {
  constructor(private navCtrl: NavController) {}

  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }
}
