import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service'; // Sesuaikan path jika perlu

@Component({
  selector: 'app-halaman-utama-karyawan',
  templateUrl: './halaman-utama-karyawan.page.html',
  styleUrls: ['./halaman-utama-karyawan.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class HalamanUtamaKaryawanPage implements OnInit {
  userName: string = 'Karyawan'; // Nilai default

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // Ambil nama user dari service
    const user = this.authService.getUser();
    if (user && user.name) {
      this.userName = user.name;
    }
  }

  // Fungsi untuk navigasi
  goTo(path: string) {
    this.router.navigate([path]);
  }

  // Fungsi untuk logout
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout gagal', err);
        // Tetap paksa logout jika API gagal
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    });
  }
}