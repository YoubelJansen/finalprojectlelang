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
   * Logika kompleks tidak lagi diperlukan karena kita sudah punya halaman perantara.
   */
  goTo(page: string) {
    // Langsung navigasi ke halaman yang namanya dikirim dari HTML.
    this.router.navigate(['/' + page]);
  }

  /**
   * Fungsi untuk logout yang lebih andal.
   */
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        // Arahkan ke halaman login HANYA setelah server mengkonfirmasi logout
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Proses logout gagal di server:', err);
        // Jika API gagal, tetap paksa logout di sisi klien
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    });
  }
}
