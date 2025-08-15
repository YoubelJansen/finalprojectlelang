import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PenetapanPemenangPoPageRoutingModule } from './penetapan-pemenang-po-routing.module';

import { PenetapanPemenangPoPage } from './penetapan-pemenang-po.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PenetapanPemenangPoPageRoutingModule
  ],
  declarations: [PenetapanPemenangPoPage]
})
export class PenetapanPemenangPoPageModule {}
