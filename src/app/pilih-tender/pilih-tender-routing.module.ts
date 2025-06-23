import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PilihTenderPage } from './pilih-tender.page';

const routes: Routes = [
  {
    path: '',
    component: PilihTenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PilihTenderPageRoutingModule {}
