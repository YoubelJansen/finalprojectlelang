import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PenetapanPemenangPoPage } from './penetapan-pemenang-po.page';

const routes: Routes = [
  {
    path: '',
    component: PenetapanPemenangPoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PenetapanPemenangPoPageRoutingModule {}
