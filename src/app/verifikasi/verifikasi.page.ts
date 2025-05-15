import { Component } from '@angular/core';

@Component({
  selector: 'app-verifikasi',
  templateUrl: './verifikasi.page.html',
  styleUrls: ['./verifikasi.page.scss'],
  standalone: false,
})
export class VerifikasiPage {
  daftarPengajuan = [
    {
      id: 1,
      nama: 'Pengadaan Laptop',
      deskripsi: 'Permintaan 3 unit laptop untuk tim IT.',
      status: 'Menunggu',
    },
    {
      id: 2,
      nama: 'Pengadaan Meja Kerja',
      deskripsi: '5 meja kerja tambahan untuk tim operasional.',
      status: 'Menunggu',
    }
  ];

  setujui(pengajuan: any) {
    pengajuan.status = 'Disetujui';
  }

  tolak(pengajuan: any) {
    pengajuan.status = 'Ditolak';
  }
}
