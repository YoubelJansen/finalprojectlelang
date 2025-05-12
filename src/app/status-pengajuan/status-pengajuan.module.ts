import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatusPengajuanPageRoutingModule } from './status-pengajuan-routing.module';

import { StatusPengajuanPage } from './status-pengajuan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatusPengajuanPageRoutingModule
  ],
  declarations: [StatusPengajuanPage]
})
export class StatusPengajuanPageModule {}
