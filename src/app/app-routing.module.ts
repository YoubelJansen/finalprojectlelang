import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'halamanutama',
    loadComponent: () => import('./halamanutama/halamanutama.page').then( m => m.HalamanutamaPage)
  },
  {
    path: 'tender',
    loadChildren: () => import('./tender/tender.module').then( m => m.TenderPageModule)
  },
  {
    path: 'vendor',
    loadComponent: () => import('./vendor/vendor.page').then( m => m.VendorPage)
  },
  {
    path: 'riwayat',
    loadComponent: () => import('./riwayat/riwayat.page').then( m => m.RiwayatPage)
  },
  {
    path: 'buat-tender',
    loadComponent: () => import('./buat-tender/buat-tender.page').then( m => m.BuatTenderPage)
  },
  {
    path: 'halaman-utama-vendor',
    loadComponent: () => import('./halaman-utama-vendor/halaman-utama-vendor.page').then( m => m.HalamanUtamaVendorPage)
  },
  {
    path: 'akses-tender',
    loadComponent: () => import('./akses-tender/akses-tender.page').then( m => m.AksesTenderPage)
  },
  {
    path: 'bidding-penilaian/:id',
    loadComponent: () => import('./bidding-penilaian/bidding-penilaian.page').then( m => m.BiddingPenilaianPage)
  },
  {
    path: 'jadwal-aanwijzing',
    loadComponent: () => import('./jadwal-aanwijzing/jadwal-aanwijzing.page').then( m => m.JadwalAanwijzingPage)
  },
  {
    path: 'pemenang-po',
    loadChildren: () => import('./pemenang-po/pemenang-po.module').then( m => m.PemenangPoPageModule)
  },
  {
    path: 'pengajuan-penawaran',
    loadComponent: () => import('./pengajuan-penawaran/pengajuan-penawaran.page').then( m => m.PengajuanPenawaranPage)
  },
  {
    path: 'registrasi-vendor',
    loadChildren: () => import('./registrasi-vendor/registrasi-vendor.module').then( m => m.RegistrasiVendorPageModule)
  },
  {
    path: 'halaman-utama-karyawan',
    loadComponent: () => import('./halaman-utama-karyawan/halaman-utama-karyawan.page').then( m => m.HalamanUtamaKaryawanPage)
  },
  {
    path: 'pengajuan-permintaan',
    loadComponent: () => import('./pengajuan-permintaan/pengajuan-permintaan.page').then( m => m.PengajuanPermintaanPage)
  },
  {
    path: 'status-pengajuan',
    loadComponent: () => import('./status-pengajuan/status-pengajuan.page').then( m => m.StatusPengajuanPage)
  },
  {
    path: 'riwayat-permintaan',
    loadComponent: () => import('./riwayat-permintaan/riwayat-permintaan.page').then( m => m.RiwayatPermintaanPage)
  },
  {
    path: 'halaman-utama-atasan',
    loadComponent: () => import('./halaman-utama-atasan/halaman-utama-atasan.page').then( m => m.HalamanUtamaAtasanPage)
  },
  {
    path: 'verifikasi',
    loadComponent: () => import('./verifikasi/verifikasi.page').then( m => m.VerifikasiPage)
  },
  {
    path: 'rekap',
    loadComponent: () => import('./rekap/rekap.page').then( m => m.RekapPage)
  },
  {
    path: 'kelola-pengadaan',
    loadComponent: () => import('./kelola-pengadaan/kelola-pengadaan.page').then( m => m.KelolaPengadaanPage)
  },
  {
    path: 'proses-aanwijzing', // Pastikan path ini sesuai
    loadComponent: () => import('./proses-aanwijzing/proses-aanwijzing.page').then( m => m.ProsesAanwijzingPage)
  },
  {
    path: 'penetapan-pemenang-po',
    loadChildren: () => import('./penetapan-pemenang-po/penetapan-pemenang-po.module').then( m => m.PenetapanPemenangPoPageModule)
  },
  {
    path: 'kelola-vendor/:id',
    loadComponent: () => import('./kelola-vendor/kelola-vendor.page').then( m => m.KelolaVendorPage)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
