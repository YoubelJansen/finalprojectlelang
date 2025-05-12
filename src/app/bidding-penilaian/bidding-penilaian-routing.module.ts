import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiddingPenilaianPage } from './bidding-penilaian.page';

const routes: Routes = [
  {
    path: '',
    component: BiddingPenilaianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiddingPenilaianPageRoutingModule {}
