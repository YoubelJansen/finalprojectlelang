import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PemenangPoPageRoutingModule } from './pemenang-po-routing.module';

import { PemenangPoPage } from './pemenang-po.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PemenangPoPageRoutingModule
  ],
  declarations: [PemenangPoPage]
})
export class PemenangPoPageModule {}
