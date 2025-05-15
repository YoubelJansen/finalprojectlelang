import { Component } from '@angular/core';

@Component({
  selector: 'app-riwayat-permintaan',
  templateUrl: './riwayat-permintaan.page.html',
  styleUrls: ['./riwayat-permintaan.page.scss'],
  standalone: false,
})
export class RiwayatPermintaanPage {
  daftarRiwayat = [
    {
      namaItem: 'Meja Rapat Besar',
      kuantitas: 1,
      tanggal: '03-05-2025',
      status: 'Disetujui',
      dokumenUrl: 'assets/docs/meja-rapat.pdf'
    },
    {
      namaItem: 'Printer LaserJet',
      kuantitas: 2,
      tanggal: '28-04-2025',
      status: 'Ditolak',
      dokumenUrl: 'assets/docs/printer-laserjet.pdf'
    },
    {
      namaItem: 'Jasa Konsultan IT',
      kuantitas: 1,
      tanggal: '20-04-2025',
      status: 'Sedang Diproses',
      dokumenUrl: 'assets/docs/konsultan-it.pdf'
    }
  ];

  lihatDokumen(url: string) {
    window.open(url, '_blank');
  }
}
