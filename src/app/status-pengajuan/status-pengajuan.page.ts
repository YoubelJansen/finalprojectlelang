import { Component, OnInit } from '@angular/core';
import { ProcurementService } from '../procurement.service'; // Sesuaikan dengan nama service Anda
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-status-pengajuan', // atau 'app-riwayat-permintaan'
  templateUrl: './status-pengajuan.page.html', // atau './riwayat-permintaan.page.html'
  styleUrls: ['./status-pengajuan.page.scss'], // atau './riwayat-permintaan.page.scss'
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StatusPengajuanPage implements OnInit { // atau RiwayatPermintaanPage
  
  requests: any[] = [];
  isLoading = true;

  constructor(private procurementService: ProcurementService) { }

  ngOnInit() {
    this.loadRequests();
  }

  ionViewWillEnter() {
    this.loadRequests();
  }

  loadRequests(event?: any) {
    this.isLoading = true;
    this.procurementService.getRequests().subscribe({
      next: (res: any) => {
        this.requests = res;
        this.isLoading = false;
        if (event) event.target.complete();
      },
      error: (err: any) => {
        console.error('Gagal memuat data:', err);
        this.isLoading = false;
        if (event) event.target.complete();
      }
    });
  }

  // --- FUNGSI BANTUAN UNTUK TAMPILAN ---

  getStatusColor(status: string): string {
    if (status.includes('approved')) return 'success';
    if (status.includes('rejected')) return 'danger';
    if (status.includes('progress')) return 'warning';
    return 'medium';
  }

  getStatusIcon(status: string): string {
    if (status.includes('approved')) return 'checkmark-circle-outline';
    if (status.includes('rejected')) return 'close-circle-outline';
    if (status.includes('progress')) return 'rocket-outline';
    return 'hourglass-outline'; // Untuk 'pending_approval'
  }

  formatStatus(status: string): string {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  handleRefresh(event: any) {
    this.loadRequests(event);
  }
}