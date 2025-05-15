import { Component, OnInit } from '@angular/core';

interface SesiAanwijzing {
  id: number;
  namaTender: string;
  tanggal: string;
  deskripsi: string;
}

interface DokumenVendor {
  id: number;
  namaVendor: string;
  namaFile: string;
  statusVerifikasi: 'Belum Diverifikasi' | 'Terverifikasi' | 'Ditolak';
}

interface Bidding {
  id: number;
  namaVendor: string;
  hargaPenawaran: number;
  skorTeknis: number;
  skorAkhir?: number;
}

@Component({
  selector: 'app-proses-aanwijzing',
  templateUrl: './proses-aanwijzing.page.html',
  styleUrls: ['./proses-aanwijzing.page.scss'],
  standalone: false,
})
export class ProsesAanwijzingPage implements OnInit {
  sesiAanwijzing: SesiAanwijzing[] = [];
  dokumenVendor: DokumenVendor[] = [];
  daftarBidding: Bidding[] = [];

  constructor() {}

  ngOnInit() {
    // Mock data awal
    this.sesiAanwijzing = [
      {
        id: 1,
        namaTender: 'Pengadaan Server 2025',
        tanggal: '2025-05-20',
        deskripsi: 'Pemaparan kebutuhan teknis server dan spesifikasi minimum.',
      }
    ];

    this.dokumenVendor = [
      {
        id: 1,
        namaVendor: 'PT. Teknologi Hebat',
        namaFile: 'penawaran_teknologihebat.pdf',
        statusVerifikasi: 'Belum Diverifikasi',
      },
      {
        id: 2,
        namaVendor: 'CV. Solusi Cepat',
        namaFile: 'dokumen_cvsc.pdf',
        statusVerifikasi: 'Terverifikasi',
      }
    ];

    this.daftarBidding = [
      { id: 1, namaVendor: 'PT. Teknologi Hebat', hargaPenawaran: 98000000, skorTeknis: 85 },
      { id: 2, namaVendor: 'CV. Solusi Cepat', hargaPenawaran: 95000000, skorTeknis: 80 },
    ];

    // Hitung skor akhir (contoh formula: 60% teknis + 40% harga terendah)
    this.hitungSkorAkhir();
  }

  verifikasiDokumen(id: number, status: 'Terverifikasi' | 'Ditolak') {
    const dok = this.dokumenVendor.find(d => d.id === id);
    if (dok) {
      dok.statusVerifikasi = status;
    }
  }

  hitungSkorAkhir() {
    const hargaTerendah = Math.min(...this.daftarBidding.map(b => b.hargaPenawaran));
    this.daftarBidding.forEach(bid => {
      const skorHarga = (hargaTerendah / bid.hargaPenawaran) * 100;
      bid.skorAkhir = Math.round((bid.skorTeknis * 0.6) + (skorHarga * 0.4));
    });
  }

  tambahSesiAanwijzing(tender: SesiAanwijzing) {
    this.sesiAanwijzing.push({ ...tender, id: this.sesiAanwijzing.length + 1 });
  }
}
