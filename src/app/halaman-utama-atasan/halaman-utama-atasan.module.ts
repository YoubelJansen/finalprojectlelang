import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HalamanUtamaAtasanPageRoutingModule } from './halaman-utama-atasan-routing.module';

import { HalamanUtamaAtasanPage } from './halaman-utama-atasan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HalamanUtamaAtasanPageRoutingModule
  ],
  declarations: [HalamanUtamaAtasanPage]
})
export class HalamanUtamaAtasanPageModule {}
