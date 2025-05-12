import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JadwalAanwijzingPageRoutingModule } from './jadwal-aanwijzing-routing.module';

import { JadwalAanwijzingPage } from './jadwal-aanwijzing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JadwalAanwijzingPageRoutingModule
  ],
  declarations: [JadwalAanwijzingPage]
})
export class JadwalAanwijzingPageModule {}
