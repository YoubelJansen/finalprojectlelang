// penetapan-pemenang-po.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-penetapan-pemenang-po',
  templateUrl: './penetapan-pemenang-po.page.html',
  styleUrls: ['./penetapan-pemenang-po.page.scss'],
  standalone: false,
})
export class PenetapanPemenangPoPage {
  winner: any = null;
  poData: any = null;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.winner = nav?.extras?.state?.['winner'] || null;
  }

  generatePO() {
    if (!this.winner) return;

    const dateNow = new Date();
    this.poData = {
      poNumber: 'PO-' + Math.floor(Math.random() * 100000),
      vendorId: this.winner.id,
      vendorName: this.winner.name,
      totalPrice: this.winner.price,
      issuedDate: dateNow.toLocaleDateString(),
      issuedTime: dateNow.toLocaleTimeString(),
      status: 'Issued'
    };

    alert(`PO berhasil diterbitkan untuk ${this.poData.vendorName}`);
  }
}
