import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // <-- Import DatePipe & CommonModule
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { SupervisorService } from '../supervisor.service'; // <-- Import service baru

@Component({
  selector: 'app-verifikasi',
  templateUrl: './verifikasi.page.html',
  styleUrls: ['./verifikasi.page.scss'],
  standalone: true, // <-- Ubah jadi true
  imports: [IonicModule, CommonModule, FormsModule, DatePipe] // <-- Tambahkan imports
})
export class VerifikasiPage {
  requests: any[] = [];
  isLoading: boolean = true;

  constructor(
    private supervisorService: SupervisorService,
    private alertCtrl: AlertController
  ) { }

  ionViewWillEnter() { this.loadRequests(); }

  loadRequests(event?: any) {
    this.isLoading = true;
    this.supervisorService.getPendingRequests().subscribe({
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

  async promptApprove(request: any) {
    const alert = await this.alertCtrl.create({
      header: 'Setujui Pengajuan?',
      message: `Anda akan menyetujui: "${request.title}"`,
      inputs: [{ name: 'notes', type: 'textarea', placeholder: 'Catatan (opsional)' }],
      buttons: [
        { text: 'Batal', role: 'cancel' },
        { text: 'Setujui', handler: (data) => this.approveRequest(request.id, data.notes) }
      ]
    });
    await alert.present();
  }
  
  async promptReject(request: any) {
    const alert = await this.alertCtrl.create({
      header: 'Tolak Pengajuan?',
      message: `Anda akan menolak: "${request.title}"`,
      inputs: [{ name: 'notes', type: 'textarea', placeholder: 'Alasan penolakan (wajib)' }],
      buttons: [
        { text: 'Batal', role: 'cancel' },
        { text: 'Tolak', handler: (data) => {
            if (!data.notes || data.notes.trim() === '') return false; // Validasi catatan tidak boleh kosong
            this.rejectRequest(request.id, data.notes);
            return true;
        }}
      ]
    });
    await alert.present();
  }

  approveRequest(id: number, notes?: string) {
    this.supervisorService.approveRequest(id, { notes }).subscribe(() => this.loadRequests());
  }

  rejectRequest(id: number, notes: string) {
    this.supervisorService.rejectRequest(id, { notes }).subscribe(() => this.loadRequests());
  }
}