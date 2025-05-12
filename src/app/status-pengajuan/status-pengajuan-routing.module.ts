import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusPengajuanPage } from './status-pengajuan.page';

const routes: Routes = [
  {
    path: '',
    component: StatusPengajuanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatusPengajuanPageRoutingModule {}
