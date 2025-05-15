import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HalamanUtamaKaryawanPage } from './halaman-utama-karyawan.page';

const routes: Routes = [
  {
    path: '',
    component: HalamanUtamaKaryawanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HalamanUtamaKaryawanPageRoutingModule {}
