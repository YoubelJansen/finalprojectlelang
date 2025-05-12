import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengajuanPenawaranPage } from './pengajuan-penawaran.page';

const routes: Routes = [
  {
    path: '',
    component: PengajuanPenawaranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengajuanPenawaranPageRoutingModule {}
