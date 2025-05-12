import { Component } from '@angular/core';

@Component({
  selector: 'app-status-pengajuan',
  templateUrl: './status-pengajuan.page.html',
  styleUrls: ['./status-pengajuan.page.scss'],
  standalone: false,
})
export class StatusPengajuanPage {
  daftarPengajuan = [
    {
      namaItem: 'Laptop Lenovo ThinkPad',
      kuantitas: 2,
      tanggal: '10-05-2025',
      status: 'Disetujui'
    },
    {
      namaItem: 'Kursi Ergonomis',
      kuantitas: 5,
      tanggal: '09-05-2025',
      status: 'Sedang Diproses'
    },
    {
      namaItem: 'Jasa Outsourcing',
      kuantitas: 1,
      tanggal: '08-05-2025',
      status: 'Ditolak'
    }
  ];

  getBadgeColor(status: string): string {
    switch (status) {
      case 'Disetujui':
        return 'success';
      case 'Ditolak':
        return 'danger';
      case 'Sedang Diproses':
        return 'warning';
      default:
        return 'medium';
    }
  }
}
