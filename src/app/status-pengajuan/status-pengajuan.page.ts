import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProcurementService } from '../procurement.service';

@Component({
  selector: 'app-status-pengajuan',
  templateUrl: './status-pengajuan.page.html',
  styleUrls: ['./status-pengajuan.page.scss'],
  standalone: true, // <-- Ubah menjadi standalone
  imports: [IonicModule, CommonModule, FormsModule, DatePipe]
})
export class StatusPengajuanPage {
  requests: any[] = [];
  isLoading: boolean = true;

  constructor(private procurementService: ProcurementService) { }

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
        console.error(err);
        this.isLoading = false;
        if (event) event.target.complete();
      }
    });
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
}