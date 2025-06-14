import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth.service'; // Sesuaikan path jika perlu

@Component({
  selector: 'app-halaman-utama-vendor',
  templateUrl: './halaman-utama-vendor.page.html',
  styleUrls: ['./halaman-utama-vendor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class HalamanUtamaVendorPage implements OnInit {
  userName: string = 'Vendor'; // Nama default

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

  // Nama fungsi diubah agar cocok dengan HTML
  goTo(page: string) {
    this.router.navigate(['/' + page]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
