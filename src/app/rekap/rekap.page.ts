import { Component } from '@angular/core';

@Component({
  selector: 'app-rekap',
  templateUrl: './rekap.page.html',
  styleUrls: ['./rekap.page.scss'],
  standalone: false,
  
})
export class RekapPage {
  dataRekap = [
    {
      tim: 'Tim IT',
      permintaan: '3 Laptop, 2 Monitor',
      status: 'Disetujui',
    },
    {
      tim: 'Operasional',
      permintaan: '5 Meja Kerja',
      status: 'Menunggu',
    },
    {
      tim: 'Marketing',
      permintaan: '5 HP, 10 Brosur',
      status: 'Ditolak',
    }
  ];

  getWarnaStatus(status: string): string {
    switch (status) {
      case 'Disetujui':
        return 'success';
      case 'Ditolak':
        return 'danger';
      case 'Menunggu':
        return 'warning';
      default:
        return 'medium';
    }
  }
}
