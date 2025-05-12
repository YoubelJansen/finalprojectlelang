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
    this.userName = localStorage.getItem('userName') || 'Pengguna';
  }

  goTo(page: string) {
    this.router.navigate(['/' + page]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
