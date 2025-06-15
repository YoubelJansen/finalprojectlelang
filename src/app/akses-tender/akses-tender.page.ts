import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { PublicTenderService } from '../public-tender.service'; // Sesuaikan path jika perlu
import { Router } from '@angular/router'; // <-- 1. Import Router

@Component({
  selector: 'app-akses-tender',
  templateUrl: './akses-tender.page.html',
  styleUrls: ['./akses-tender.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DatePipe]
})
export class AksesTenderPage {
  tenders: any[] = [];
  isLoading: boolean = true;

  constructor(
    private publicTenderService: PublicTenderService,
    private alertCtrl: AlertController,
    private router: Router // <-- 2. Inject Router di constructor
  ) {}

  ionViewWillEnter() {
    this.loadTenders();
  }

  loadTenders(event?: any) {
    this.isLoading = true;
    this.publicTenderService.getOpenTenders().subscribe({
      next: (res: any) => {
        this.tenders = res;
        this.isLoading = false;
        if (event) event.target.complete();
      },
      error: (err: any) => {
        this.isLoading = false;
        if (event) event.target.complete();
        console.error(err);
      }
    });
  }

  handleRefresh(event: any) {
    this.loadTenders(event);
  }

  // 3. UBAH LOGIKA FUNGSI INI
  ajukanPenawaran(tender: any) {
    // Arahkan ke halaman pertama dari alur (profil vendor),
    // sambil mengirim data 'tender' yang dipilih melalui state.
    this.router.navigateByUrl('/vendor', { state: { tender: tender } });
  }
}
