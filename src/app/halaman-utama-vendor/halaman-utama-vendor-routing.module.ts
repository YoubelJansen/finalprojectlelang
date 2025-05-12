import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HalamanUtamaVendorPage } from './halaman-utama-vendor.page';

const routes: Routes = [
  {
    path: '',
    component: HalamanUtamaVendorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HalamanUtamaVendorPageRoutingModule {}
