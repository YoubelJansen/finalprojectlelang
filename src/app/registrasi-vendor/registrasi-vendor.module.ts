import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrasiVendorPageRoutingModule } from './registrasi-vendor-routing.module';

import { RegistrasiVendorPage } from './registrasi-vendor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrasiVendorPageRoutingModule
  ],
  declarations: [RegistrasiVendorPage]
})
export class RegistrasiVendorPageModule {}
