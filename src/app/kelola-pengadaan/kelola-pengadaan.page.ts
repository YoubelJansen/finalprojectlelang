import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router'; // <-- Jangan lupa import Router

@Component({
  selector: 'app-kelola-pengadaan',
  templateUrl: './kelola-pengadaan.page.html',
  styleUrls: ['./kelola-pengadaan.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DatePipe]
})
export class KelolaPengadaanPage {

  requests: any[] = [];
  isLoading: boolean = true;

  constructor(
    private adminService: AdminService,
    private alertCtrl: AlertController,
    private router: Router // <-- Inject Router di constructor
  ) {}

  ionViewWillEnter() {
    this.loadRequests();
  }

  loadRequests(event?: any) {
    this.isLoading = true;
    this.adminService.getApprovedRequests().subscribe({
      next: (res: any) => {
        this.requests = res;
        this.isLoading = false;
        if (event) event.target.complete();
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
        if (event) event.target.complete();
      }
    });
  }

  handleRefresh(event: any) {
    this.loadRequests(event);
  }

  // Fungsi yang dipanggil oleh tombol di HTML
  buatTender(request: any) {
    // Kirim data 'request' ke halaman form tender menggunakan state
    this.router.navigateByUrl('/buat-tender', { state: { request: request } });
  }
}
