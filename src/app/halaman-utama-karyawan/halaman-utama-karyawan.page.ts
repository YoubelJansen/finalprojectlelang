import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router'; // <-- Import Router & RouterModule
import { AuthService } from '../auth.service'; // <-- Import AuthService

@Component({
  selector: 'app-halaman-utama-karyawan',
  templateUrl: './halaman-utama-karyawan.page.html',
  styleUrls: ['./halaman-utama-karyawan.page.scss'],
  standalone: true, // <-- Kita jadikan standalone
  imports: [IonicModule, CommonModule, FormsModule, RouterModule] // <-- Tambahkan imports
})
export class HalamanUtamaKaryawanPage {

  constructor(
    private authService: AuthService, // <-- Inject AuthService
    private router: Router // <-- Inject Router
  ) { }

  // FUNGSI BARU UNTUK LOGOUT
  logout() {
    this.authService.logout(); // Panggil fungsi logout dari service
    this.router.navigate(['/login']); // Arahkan kembali ke halaman login
  }

}