import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengajuanPermintaanPage } from './pengajuan-permintaan.page';

const routes: Routes = [
  {
    path: '',
    component: PengajuanPermintaanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengajuanPermintaanPageRoutingModule {}
