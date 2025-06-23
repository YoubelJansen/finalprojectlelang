import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service'; // Pastikan path ini benar
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pemenang-po',
  templateUrl: './pemenang-po.page.html',
  styleUrls: ['./pemenang-po.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PemenangPoPage implements OnInit {
  results: any[] = [];
  isLoading = true;

  constructor(private vendorService: VendorService) { }

  ngOnInit() {
    this.loadResults();
  }

  ionViewWillEnter() {
    this.loadResults();
  }

  loadResults() {
    this.isLoading = true;
    this.vendorService.getResults().subscribe({
      next: (res: any[]) => {
        this.results = res;
        this.isLoading = false;

        // --- INI BAGIAN PENTING UNTUK DEBUGGING ---
        // Mencetak data yang diterima dari server ke console browser.
        console.log('Data Hasil Tender Diterima:', this.results); 
      },
      error: (err: any) => {
        console.error('Gagal mengambil hasil tender:', err);
        this.isLoading = false;
      }
    });
  }
}