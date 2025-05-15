import { Component } from '@angular/core';

@Component({
  selector: 'app-riwayat',
  templateUrl: './riwayat.page.html',
  styleUrls: ['./riwayat.page.scss'],
  standalone: false,
})
export class RiwayatPage {
  tenderList: any[] = [];

  ngOnInit() {
    this.loadTenders();
  }

  loadTenders() {
    const data = localStorage.getItem('tenders');
    if (data) {
      const entries = data.split('|');
      this.tenderList = entries.map(entry => {
        const [nama, spesifikasi, kuantitas, alasan, tanggal] = entry.split('~');
        return { nama, spesifikasi, kuantitas, alasan, tanggal };
      });
    }
  }

  hapusTender(index: number) {
    this.tenderList.splice(index, 1);
    const updatedData = this.tenderList.map(t =>
      `${t.nama}~${t.spesifikasi}~${t.kuantitas}~${t.alasan}~${t.tanggal}`
    ).join('|');
    localStorage.setItem('tenders', updatedData);
  }
}
