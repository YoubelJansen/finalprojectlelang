import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PilihTenderPageRoutingModule } from './pilih-tender-routing.module';

import { PilihTenderPage } from './pilih-tender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PilihTenderPageRoutingModule
  ],
  declarations: [PilihTenderPage]
})
export class PilihTenderPageModule {}
