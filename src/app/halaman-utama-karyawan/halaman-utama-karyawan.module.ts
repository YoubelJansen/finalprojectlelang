import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HalamanUtamaKaryawanPageRoutingModule } from './halaman-utama-karyawan-routing.module';

import { HalamanUtamaKaryawanPage } from './halaman-utama-karyawan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HalamanUtamaKaryawanPageRoutingModule
  ],
  declarations: [HalamanUtamaKaryawanPage]
})
export class HalamanUtamaKaryawanPageModule {}
