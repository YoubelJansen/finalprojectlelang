import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-halamanutama',
  templateUrl: './halamanutama.page.html',
  styleUrls: ['./halamanutama.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class HalamanutamaPage implements OnInit {
  userName: string = 'Admin';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    if (user && user.name) {
      this.userName = user.name;
    }
  }

  /**
   * Navigasi ke halaman yang sesuai.
   */
  goTo(page: string) {
    // --- PERBAIKAN DI SINI ---
    // Jika menu yang diklik memerlukan pemilihan tender terlebih dahulu,
    // kita arahkan ke halaman 'riwayat'.
    const pagesThatNeedTenderSelection = [
      'kelola-vendor', 
      'proses-aanwijzing', 
      'penetapan-pemenang-po'
    ];

    if (pagesThatNeedTenderSelection.includes(page)) {
      // Arahkan ke halaman daftar tender
      this.router.navigate(['/riwayat']);
    } else {
      // Untuk menu lainnya, arahkan seperti biasa.
      this.router.navigate(['/' + page]);
    }
  }

  logout() {
    this.authService.logout();
    // Setelah logout, arahkan kembali ke halaman login
    this.router.navigate(['/login']);
  }
}
