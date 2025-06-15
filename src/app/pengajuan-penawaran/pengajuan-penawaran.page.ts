import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pengajuan-penawaran',
  templateUrl: './pengajuan-penawaran.page.html',
  styleUrls: ['./pengajuan-penawaran.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PengajuanPenawaranPage implements OnInit {
  tenderData: any;
  tenderTitle: string = 'Memuat...';

  // Objek untuk menampung data penawaran yang akan kita bangun
  bidData = {
    tender_id: null,
    administrative_document: null,
    technical_document: null,
    price_offer: null
  };

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { tender: any };
    if (state && state.tender) {
      this.tenderData = state.tender;
      this.tenderTitle = this.tenderData.title;
      this.bidData.tender_id = this.tenderData.id;
    }
  }

  ngOnInit() {
    if (!this.tenderData) {
      this.navCtrl.navigateRoot('/akses-tender');
    }
  }

  handleFileInput(event: any, docType: 'administrasi' | 'teknis') {
    const file = event.target.files[0];
    if (file) {
      if (docType === 'administrasi') {
        this.bidData.administrative_document = file;
      } else {
        this.bidData.technical_document = file;
      }
    }
  }

  goToNextStep() {
    // Arahkan ke halaman bidding sambil membawa data tender & dokumen
    this.router.navigateByUrl('/bidding-penilaian', { state: { bid: this.bidData } });
  }
}
