import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KelolaPengadaanPageRoutingModule } from './kelola-pengadaan-routing.module';

import { KelolaPengadaanPage } from './kelola-pengadaan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KelolaPengadaanPageRoutingModule
  ],
  declarations: [KelolaPengadaanPage]
})
export class KelolaPengadaanPageModule {}
