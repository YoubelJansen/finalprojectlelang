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
   * Catatan: 'kelola-vendor' akan memerlukan halaman daftar terlebih dahulu.
   * Untuk saat ini, kita akan buat logika dasarnya.
   */
  goTo(page: string) {
    // Navigasi sederhana berdasarkan string.
    // Halaman "Riwayat Tender" akan menjadi tempat untuk memilih tender spesifik
    // yang kemudian akan mengarah ke '/kelola-vendor/:id'
    this.router.navigate(['/' + page]);
  }

  logout() {
    this.authService.logout();
  }
}
