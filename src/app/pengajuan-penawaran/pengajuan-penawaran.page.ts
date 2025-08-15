import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, IonicModule, AlertController, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendorService } from '../vendor.service';

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
  isLoading = false;

  bidData: {
    tender_id: number | null;
    administrative_document: File | null;
    technical_document: File | null;
  } = {
    tender_id: null,
    administrative_document: null,
    technical_document: null,
  };

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private vendorService: VendorService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
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

  async submitAndProceed() {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({ message: 'Mengunggah dokumen...' });
    await loading.present();

    this.vendorService.submitDocuments(this.bidData).subscribe({
      next: (res) => {
        loading.dismiss();
        this.isLoading = false;
        this.router.navigate(['/bidding-penilaian', this.bidData.tender_id]);
      },
      error: async (err) => {
        loading.dismiss();
        this.isLoading = false;
        const alert = await this.alertCtrl.create({
          header: 'Unggah Gagal',
          message: err.error?.message || 'Terjadi kesalahan saat mengunggah dokumen.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  // Fungsi helper untuk menampilkan ukuran file
  getFileSize(size: number): string {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
