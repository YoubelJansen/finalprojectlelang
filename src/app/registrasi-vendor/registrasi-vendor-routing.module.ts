import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrasiVendorPage } from './registrasi-vendor.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrasiVendorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrasiVendorPageRoutingModule {}
