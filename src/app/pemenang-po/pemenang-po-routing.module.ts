import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PemenangPoPage } from './pemenang-po.page';

const routes: Routes = [
  {
    path: '',
    component: PemenangPoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PemenangPoPageRoutingModule {}
