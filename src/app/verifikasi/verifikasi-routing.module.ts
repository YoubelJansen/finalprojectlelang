import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifikasiPage } from './verifikasi.page';

const routes: Routes = [
  {
    path: '',
    component: VerifikasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifikasiPageRoutingModule {}
