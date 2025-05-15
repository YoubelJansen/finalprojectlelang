import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-halamanutama',
  templateUrl: './halamanutama.page.html',
  styleUrls: ['./halamanutama.page.scss'],
  standalone: false,
})
export class HalamanutamaPage implements OnInit {
  userName: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Ambil nama pengguna dari localStorage (jika ada)
    this.userName = localStorage.getItem('userName') || 'Pengguna';
  }

  goTo(page: string) {
    // Navigasi ke halaman fitur sesuai parameter
    this.router.navigate(['/' + page]);
  }

  logout() {
    // Bersihkan semua data dan redirect ke login
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
