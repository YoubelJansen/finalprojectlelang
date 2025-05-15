import { Component, OnInit } from '@angular/core';

interface PermintaanPengadaan {
  id: number;
  namaBarang: string;
  jumlah: number;
  tanggal: string;
  status: 'Disetujui' | 'Ditolak' | 'Menunggu';
}

@Component({
  selector: 'app-kelola-pengadaan',
  templateUrl: './kelola-pengadaan.page.html',
  styleUrls: ['./kelola-pengadaan.page.scss'],
  standalone: false,
})
export class KelolaPengadaanPage implements OnInit {

  semuaPermintaan: PermintaanPengadaan[] = [];
  permintaanDisetujui: PermintaanPengadaan[] = [];

  constructor() {}

  ngOnInit() {
    // Mock data permintaan
    this.semuaPermintaan = [
      { id: 1, namaBarang: 'Laptop', jumlah: 5, tanggal: '2025-05-10', status: 'Disetujui' },
      { id: 2, namaBarang: 'Printer', jumlah: 2, tanggal: '2025-05-11', status: 'Menunggu' },
      { id: 3, namaBarang: 'Meja Kantor', jumlah: 10, tanggal: '2025-05-09', status: 'Disetujui' },
      { id: 4, namaBarang: 'Kabel LAN', jumlah: 50, tanggal: '2025-05-08', status: 'Ditolak' },
    ];

    // Filter hanya yang statusnya "Disetujui"
    this.permintaanDisetujui = this.semuaPermintaan.filter(p => p.status === 'Disetujui');
  }
}
