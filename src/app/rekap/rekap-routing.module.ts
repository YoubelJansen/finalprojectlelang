import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RekapPage } from './rekap.page';

const routes: Routes = [
  {
    path: '',
    component: RekapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RekapPageRoutingModule {}
