import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KelolaVendorPageRoutingModule } from './kelola-vendor-routing.module';

import { KelolaVendorPage } from './kelola-vendor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KelolaVendorPageRoutingModule
  ],
  declarations: [KelolaVendorPage]
})
export class KelolaVendorPageModule {}
