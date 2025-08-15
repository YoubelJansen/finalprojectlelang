import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HalamanUtamaAtasanPage } from './halaman-utama-atasan.page';

const routes: Routes = [
  {
    path: '',
    component: HalamanUtamaAtasanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HalamanUtamaAtasanPageRoutingModule {}
