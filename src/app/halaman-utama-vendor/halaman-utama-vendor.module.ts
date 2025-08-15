import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HalamanUtamaVendorPageRoutingModule } from './halaman-utama-vendor-routing.module';

import { HalamanUtamaVendorPage } from './halaman-utama-vendor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HalamanUtamaVendorPageRoutingModule
  ],
  declarations: [HalamanUtamaVendorPage]
})
export class HalamanUtamaVendorPageModule {}
