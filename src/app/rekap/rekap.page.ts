import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SupervisorService } from '../supervisor.service';

@Component({
  selector: 'app-rekap',
  templateUrl: './rekap.page.html',
  styleUrls: ['./rekap.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DatePipe]
})
export class RekapPage {
  history: any[] = [];
  isLoading: boolean = true;

  constructor(private supervisorService: SupervisorService) { }

  ionViewWillEnter() {
    this.loadHistory();
  }

  loadHistory(event?: any) {
    this.isLoading = true;
    this.supervisorService.getHistory().subscribe({
      next: (res: any) => {
        this.history = res;
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
    this.loadHistory(event);
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
