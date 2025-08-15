import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KelolaPengadaanPage } from './kelola-pengadaan.page';

const routes: Routes = [
  {
    path: '',
    component: KelolaPengadaanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KelolaPengadaanPageRoutingModule {}
