import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pemenang-po',
  templateUrl: './pemenang-po.page.html',
  styleUrls: ['./pemenang-po.page.scss'],
  standalone: false,
})
export class PemenangPoPage {

  constructor(private router: Router) {}

  kembaliKeDashboard() {
    this.router.navigate(['/halaman-utama-vendor']);
  }
}
