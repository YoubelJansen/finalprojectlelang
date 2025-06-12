import { Component } from '@angular/core';
import { ProcurementService } from '../procurement.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-riwayat-permintaan',
  templateUrl: './riwayat-permintaan.page.html',
  styleUrls: ['./riwayat-permintaan.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RiwayatPermintaanPage {
  requests: any[] = [];
  isLoading: boolean = true;

  constructor(private procurementService: ProcurementService) { }

  ionViewWillEnter() {
    this.loadRequests();
  }

  loadRequests(event?: any) {
    this.isLoading = true;
    this.procurementService.getRequests().subscribe(
      (res: any) => {
        this.requests = res;
        this.isLoading = false;
        if (event) event.target.complete();
      },
      (err: any) => {
        console.error(err);
        this.isLoading = false;
        if (event) event.target.complete();
      }
    );
  }
  
  handleRefresh(event: any) {
    this.loadRequests(event);
  }
  
  formatStatus(status: string): string {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  getStatusColor(status: string): string {
    if (status.includes('approved')) return 'success';
    if (status.includes('rejected')) return 'danger';
    if (status.includes('progress')) return 'warning';
    return 'medium';
  }

  // FUNGSI BARU UNTUK IKON
  getStatusIcon(status: string): string {
    if (status.includes('approved')) return 'checkmark-circle-outline';
    if (status.includes('rejected')) return 'close-circle-outline';
    if (status.includes('progress')) return 'hourglass-outline';
    return 'time-outline'; // Untuk 'pending_approval'
  }
}