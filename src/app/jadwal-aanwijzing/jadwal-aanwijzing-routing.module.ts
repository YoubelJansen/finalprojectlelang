import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JadwalAanwijzingPage } from './jadwal-aanwijzing.page';

const routes: Routes = [
  {
    path: '',
    component: JadwalAanwijzingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JadwalAanwijzingPageRoutingModule {}
