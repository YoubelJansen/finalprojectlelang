import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiwayatPermintaanPage } from './riwayat-permintaan.page';

const routes: Routes = [
  {
    path: '',
    component: RiwayatPermintaanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiwayatPermintaanPageRoutingModule {}
