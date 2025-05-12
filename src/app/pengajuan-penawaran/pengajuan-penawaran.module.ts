import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PengajuanPenawaranPageRoutingModule } from './pengajuan-penawaran-routing.module';

import { PengajuanPenawaranPage } from './pengajuan-penawaran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PengajuanPenawaranPageRoutingModule
  ],
  declarations: [PengajuanPenawaranPage]
})
export class PengajuanPenawaranPageModule {}
