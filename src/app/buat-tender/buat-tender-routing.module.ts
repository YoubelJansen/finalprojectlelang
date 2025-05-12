import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuatTenderPage } from './buat-tender.page';

const routes: Routes = [
  {
    path: '',
    component: BuatTenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuatTenderPageRoutingModule {}
