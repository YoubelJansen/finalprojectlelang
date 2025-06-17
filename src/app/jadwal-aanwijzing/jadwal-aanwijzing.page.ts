import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VendorService } from '../vendor.service'; // Pastikan path ini benar

@Component({
  selector: 'app-jadwal-aanwijzing',
  templateUrl: './jadwal-aanwijzing.page.html',
  styleUrls: ['./jadwal-aanwijzing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class JadwalAanwijzingPage implements OnInit {
  schedules: any[] = [];
  isLoading = true; // State untuk menampilkan loading spinner

  constructor(private vendorService: VendorService) { }

  ngOnInit() {
    this.loadSchedules();
  }

  /**
   * Mengambil data jadwal dari server.
   */
  loadSchedules() {
    this.isLoading = true;
    
    this.vendorService.getJadwalAanwijzing().subscribe({
      next: (res: any) => {
        this.schedules = res;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Gagal memuat jadwal:', err);
        this.isLoading = false;
        // Di sini Anda bisa menambahkan popup alert jika gagal
      }
    });
  }
}
