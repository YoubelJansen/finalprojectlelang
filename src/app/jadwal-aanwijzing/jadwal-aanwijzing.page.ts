import { Component } from '@angular/core';

@Component({
  selector: 'app-jadwal-aanwijzing',
  templateUrl: './jadwal-aanwijzing.page.html',
  styleUrls: ['./jadwal-aanwijzing.page.scss'],
  standalone: false,
})
export class JadwalAanwijzingPage {
  jadwalList: any[] = [];

  constructor() {}

  ngOnInit() {
    this.loadJadwal();
  }

  loadJadwal() {
    const dummyJadwal = [
      {
        id: 1,
        namaProyek: 'Pembangunan Gedung Kantor',
        waktu: new Date('2025-05-20T10:00:00'),
        tempat: 'Zoom Meeting / Kantor Pusat',
        diterima: false,
      },
      {
        id: 2,
        namaProyek: 'Pengadaan Kendaraan Operasional',
        waktu: new Date('2025-05-25T14:00:00'),
        tempat: 'Google Meet / Ruang Meeting A',
        diterima: false,
      }
    ];

    // Jika belum ada data di localStorage, simpan dummy-nya dulu
    if (!localStorage.getItem('jadwalAanwijzing')) {
      localStorage.setItem('jadwalAanwijzing', JSON.stringify(dummyJadwal));
    }

    this.jadwalList = JSON.parse(localStorage.getItem('jadwalAanwijzing') || '[]');
  }

  terimaUndangan(item: any) {
    item.diterima = true;
    const index = this.jadwalList.findIndex(j => j.id === item.id);
    this.jadwalList[index] = item;
    localStorage.setItem('jadwalAanwijzing', JSON.stringify(this.jadwalList));
    alert('Undangan telah diterima!');
  }
}
