import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AksesTenderPage } from './akses-tender.page';

const routes: Routes = [
  {
    path: '',
    component: AksesTenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AksesTenderPageRoutingModule {}
