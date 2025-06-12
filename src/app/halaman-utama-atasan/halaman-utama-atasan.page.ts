import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // <-- Import RouterModule
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service'; // <-- Import AuthService

@Component({
  selector: 'app-halaman-utama-atasan',
  templateUrl: './halaman-utama-atasan.page.html',
  styleUrls: ['./halaman-utama-atasan.page.scss'],
  standalone: true, // <-- Ubah jadi true
  imports: [IonicModule, RouterModule] // <-- Tambahkan imports
})
export class HalamanUtamaAtasanPage {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout(); // Panggil fungsi logout dari service
    this.router.navigate(['/login']); // Arahkan ke halaman login
  }
}