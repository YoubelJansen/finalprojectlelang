import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service'; // Pastikan path ini benar
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router'; // 1. Pastikan Router di-import

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

  // 2. INI BAGIAN PENTING: Inject 'Router' di constructor
  constructor(
    private adminService: AdminService,
    private router: Router 
  ) { }

  ngOnInit() {
    this.loadTenders();
  }

  ionViewWillEnter() {
    this.loadTenders();
  }

  loadTenders() {
    this.isLoading = true;
    this.adminService.getTenders().subscribe({
      next: (res: any[]) => {
        this.tenders = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Gagal memuat riwayat tender:', err);
        this.isLoading = false;
      }
    });
  }

  /**
   * 3. Fungsi baru untuk menangani klik dan melakukan navigasi.
   */
  goToKelolaTender(tender: any) {
    // Memeriksa apakah tender dan tender.id ada sebelum berpindah halaman
    if (tender && tender.id) {
      // Jika ada, navigasi ke halaman kelola-vendor dengan ID yang benar
      this.router.navigate(['/kelola-vendor', tender.id]);
    } else {
      console.error('NAVIGASI GAGAL: ID Tender tidak ditemukan pada objek!', tender);
      // Tampilkan alert kepada pengguna jika perlu
    }
  }
}