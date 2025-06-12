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
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'halamanutama',
    loadChildren: () => import('./halamanutama/halamanutama.module').then( m => m.HalamanutamaPageModule)
  },
  {
    path: 'tender',
    loadChildren: () => import('./tender/tender.module').then( m => m.TenderPageModule)
  },
  {
    path: 'vendor',
    loadChildren: () => import('./vendor/vendor.module').then( m => m.VendorPageModule)
  },
  {
    path: 'riwayat',
    loadChildren: () => import('./riwayat/riwayat.module').then( m => m.RiwayatPageModule)
  },
  {
    path: 'buat-tender',
    loadChildren: () => import('./buat-tender/buat-tender.module').then( m => m.BuatTenderPageModule)
  },
  {
    path: 'halaman-utama-vendor',
    loadChildren: () => import('./halaman-utama-vendor/halaman-utama-vendor.module').then( m => m.HalamanUtamaVendorPageModule)
  },
  {
    path: 'akses-tender',
    loadChildren: () => import('./akses-tender/akses-tender.module').then( m => m.AksesTenderPageModule)
  },
  {
    path: 'bidding-penilaian',
    loadChildren: () => import('./bidding-penilaian/bidding-penilaian.module').then( m => m.BiddingPenilaianPageModule)
  },
  {
    path: 'jadwal-aanwijzing',
    loadChildren: () => import('./jadwal-aanwijzing/jadwal-aanwijzing.module').then( m => m.JadwalAanwijzingPageModule)
  },
  {
    path: 'pemenang-po',
    loadChildren: () => import('./pemenang-po/pemenang-po.module').then( m => m.PemenangPoPageModule)
  },
  {
    path: 'pengajuan-penawaran',
    loadChildren: () => import('./pengajuan-penawaran/pengajuan-penawaran.module').then( m => m.PengajuanPenawaranPageModule)
  },
  {
    path: 'registrasi-vendor',
    loadChildren: () => import('./registrasi-vendor/registrasi-vendor.module').then( m => m.RegistrasiVendorPageModule)
  },
  {
    path: 'halaman-utama-karyawan',
    loadChildren: () => import('./halaman-utama-karyawan/halaman-utama-karyawan.module').then( m => m.HalamanUtamaKaryawanPageModule)
  },
  {
    path: 'pengajuan-permintaan',
    loadChildren: () => import('./pengajuan-permintaan/pengajuan-permintaan.module').then( m => m.PengajuanPermintaanPageModule)
  },
  {
    path: 'status-pengajuan',
    loadChildren: () => import('./status-pengajuan/status-pengajuan.module').then( m => m.StatusPengajuanPageModule)
  },
  {
    path: 'riwayat-permintaan',
    loadChildren: () => import('./riwayat-permintaan/riwayat-permintaan.module').then( m => m.RiwayatPermintaanPageModule)
  },
  {
    path: 'halaman-utama-atasan',
    loadChildren: () => import('./halaman-utama-atasan/halaman-utama-atasan.module').then( m => m.HalamanUtamaAtasanPageModule)
  },
  {
    path: 'verifikasi',
    loadChildren: () => import('./verifikasi/verifikasi.module').then( m => m.VerifikasiPageModule)
  },
  {
    path: 'rekap',
    loadChildren: () => import('./rekap/rekap.module').then( m => m.RekapPageModule)
  },
  {
    path: 'kelola-pengadaan',
    loadChildren: () => import('./kelola-pengadaan/kelola-pengadaan.module').then( m => m.KelolaPengadaanPageModule)
  },
  {
    path: 'proses-aanwijzing',
    loadChildren: () => import('./proses-aanwijzing/proses-aanwijzing.module').then( m => m.ProsesAanwijzingPageModule)
  },
  {
    path: 'penetapan-pemenang-po',
    loadChildren: () => import('./penetapan-pemenang-po/penetapan-pemenang-po.module').then( m => m.PenetapanPemenangPoPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
