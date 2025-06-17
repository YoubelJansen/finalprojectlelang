import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service'; // Pastikan path service Anda benar
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kelola-vendor', // Disesuaikan dengan nama file
  templateUrl: './kelola-vendor.page.html', // Disesuaikan dengan nama file
  styleUrls: ['./kelola-vendor.page.scss'], // Disesuaikan dengan nama file
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
// Nama kelas disesuaikan dengan nama file
export class KelolaVendorPage implements OnInit {
  tenderId: number | null = null;
  tender: any = null; 

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.tenderId = +this.route.snapshot.paramMap.get('id')!;
    if (this.tenderId) {
      this.loadTenderDetails();
    }
  }

  async loadTenderDetails() {
    const loading = await this.loadingCtrl.create({ message: 'Memuat data tender...' });
    await loading.present();

    this.adminService.getTenderDetails(this.tenderId!).subscribe({
      next: (res: any) => {
        this.tender = res;
        loading.dismiss();
      },
      error: (err: any) => {
        loading.dismiss();
        this.presentAlert('Gagal', 'Gagal memuat detail tender. Mohon coba lagi.');
      }
    });
  }

  openDocument(path: string | null) {
    if (!path) {
      this.presentAlert('Informasi', 'Vendor ini belum mengunggah dokumen tersebut.');
      return;
    }
    const baseUrl = 'http://127.0.0.1:8000/storage/';
    window.open(baseUrl + path, '_blank');
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
