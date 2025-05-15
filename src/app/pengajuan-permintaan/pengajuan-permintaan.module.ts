import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PengajuanPermintaanPageRoutingModule } from './pengajuan-permintaan-routing.module';

import { PengajuanPermintaanPage } from './pengajuan-permintaan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PengajuanPermintaanPageRoutingModule
  ],
  declarations: [PengajuanPermintaanPage]
})
export class PengajuanPermintaanPageModule {}
