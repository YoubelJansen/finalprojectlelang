import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service'; // Menggunakan AuthService

@Component({
  selector: 'app-halamanutama',
  templateUrl: './halamanutama.page.html',
  styleUrls: ['./halamanutama.page.scss'],
  standalone: true, // <-- Ubah jadi true
  imports: [IonicModule, CommonModule, RouterModule] // <-- Tambahkan imports
})
export class HalamanutamaPage implements OnInit {
  userName: string = 'Admin'; // Nama default

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Ambil data user dari service yang sudah menyimpan data saat login
    const user = this.authService.getUser();
    if (user && user.name) {
      this.userName = user.name;
    }
  }

  goTo(page: string) {
    this.router.navigate(['/' + page]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
