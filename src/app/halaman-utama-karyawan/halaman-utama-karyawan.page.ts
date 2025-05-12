import { Component } from '@angular/core';

@Component({
  selector: 'app-halaman-utama-karyawan',
  templateUrl: './halaman-utama-karyawan.page.html',
  styleUrls: ['./halaman-utama-karyawan.page.scss'],
  standalone: false,
})
export class HalamanUtamaKaryawanPage {
  form = {
    item: '',
    spesifikasi: '',
    kuantitas: null,
    alasan: ''
  };

  submitForm() {
    console.log('Permintaan Dikirim:', this.form);
    alert('Permintaan berhasil diajukan!');
  }
}
