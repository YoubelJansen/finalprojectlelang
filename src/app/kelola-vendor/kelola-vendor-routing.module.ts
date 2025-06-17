import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KelolaVendorPage } from './kelola-vendor.page';

const routes: Routes = [
  {
    path: '',
    component: KelolaVendorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KelolaVendorPageRoutingModule {}
