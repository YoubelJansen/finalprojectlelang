import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiwayatPermintaanPageRoutingModule } from './riwayat-permintaan-routing.module';

import { RiwayatPermintaanPage } from './riwayat-permintaan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiwayatPermintaanPageRoutingModule
  ],
  declarations: [RiwayatPermintaanPage]
})
export class RiwayatPermintaanPageModule {}
