import { Component } from '@angular/core';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.page.html',
  styleUrls: ['./tender.page.scss'],
  standalone: false,
})
export class TenderPage {
  tenders: any[] = [];

  ngOnInit() {
    this.loadTenders();
  }

  loadTenders() {
    const saved = localStorage.getItem('tenders');
    if (saved) {
      this.tenders = saved.split('|').map(item => {
        const [nama, deskripsi, kuantitas, alasan] = item.split('~');
        return { nama, deskripsi, kuantitas, alasan };
      });
    }
  }

  hapusTender(index: number) {
    this.tenders.splice(index, 1);
    const updated = this.tenders
      .map(t => `${t.nama}~${t.deskripsi}~${t.kuantitas}~${t.alasan}`)
      .join('|');
    localStorage.setItem('tenders', updated);
  }
}
