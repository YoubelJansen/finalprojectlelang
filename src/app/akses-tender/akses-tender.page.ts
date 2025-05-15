import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-akses-tender',
  templateUrl: './akses-tender.page.html',
  styleUrls: ['./akses-tender.page.scss'],
  standalone: false,
})
export class AksesTenderPage implements OnInit {
  tenders = [
    {
      nama: 'Pengadaan Alat Berat',
      deskripsi: 'Tender untuk pengadaan alat berat proyek tambang.',
      batas_akhir: '2025-05-31'
    },
    {
      nama: 'Pengadaan Bahan Bakar',
      deskripsi: 'Pembelian bahan bakar solar untuk operasional bulanan.',
      batas_akhir: '2025-06-15'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
