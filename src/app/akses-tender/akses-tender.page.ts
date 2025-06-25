import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { PublicTenderService } from '../public-tender.service'; // Path ini sudah benar
import { Router } from '@angular/router';

@Component({
  selector: 'app-akses-tender',
  templateUrl: './akses-tender.page.html',
  styleUrls: ['./akses-tender.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DatePipe] // DatePipe di sini sudah benar karena HTML-nya memakai | date
})
export class AksesTenderPage {
  tenders: any[] = [];
  isLoading: boolean = true;

  constructor(
    private publicTenderService: PublicTenderService,
    private alertCtrl: AlertController,
    private router: Router
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

  // Fungsi handleRefresh Anda sudah tidak dipanggil di HTML baru, tapi tidak apa-apa jika tetap ada.
  handleRefresh(event: any) {
    this.loadTenders(event);
  }
  
  // Fungsi ajukanPenawaran Anda juga aman di sini, tidak akan mengganggu.
  ajukanPenawaran(tender: any) {
    this.router.navigateByUrl('/vendor', { state: { tender: tender } });
  }

  // --- TAMBAHKAN FUNGSI BARU INI UNTUK MEMPERBAIKI ERROR ---
  /**
   * Fungsi ini dipanggil dari HTML saat kartu tender diklik.
   * Tugasnya adalah membawa pengguna ke halaman detail tender.
   */
  viewTender(tender: any) {
    console.log('Navigasi ke detail tender dengan ID:', tender.id);
    
    // Perintah ini akan mengarahkan ke halaman detail.
    // Pastikan Anda punya halaman untuk 'detail-tender' di routing Anda.
    this.router.navigate(['/detail-tender', tender.id]); 
    // CATATAN PENTING: Jika ID unik tender Anda bukan 'tender.id', 
    // ganti dengan properti yang benar, misalnya 'tender.tender_number'.
  }
}