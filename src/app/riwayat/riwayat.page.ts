import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service'; // Pastikan path ini benar
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-riwayat',
  templateUrl: './riwayat.page.html',
  styleUrls: ['./riwayat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class RiwayatPage implements OnInit {
  tenders: any[] = [];
  isLoading = true;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadTenders();
  }

  ionViewWillEnter() {
    // Muat ulang data setiap kali halaman ini dibuka untuk mendapatkan data terbaru
    this.loadTenders();
  }

  loadTenders() {
    this.isLoading = true;
    this.adminService.getTenders().subscribe({
      next: (res) => {
        this.tenders = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Gagal memuat riwayat tender:', err);
        this.isLoading = false;
      }
    });
  }
}
