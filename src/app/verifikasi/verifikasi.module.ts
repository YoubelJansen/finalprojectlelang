import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifikasiPageRoutingModule } from './verifikasi-routing.module';

import { VerifikasiPage } from './verifikasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifikasiPageRoutingModule
  ],
  declarations: [VerifikasiPage]
})
export class VerifikasiPageModule {}
