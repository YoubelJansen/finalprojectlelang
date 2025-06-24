import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service'; // Sesuaikan path jika perlu

@Component({
  selector: 'app-halaman-utama-atasan',
  templateUrl: './halaman-utama-atasan.page.html',
  styleUrls: ['./halaman-utama-atasan.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class HalamanUtamaAtasanPage implements OnInit {
  userName: string = 'Atasan'; // Nilai default

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
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