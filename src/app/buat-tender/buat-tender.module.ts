import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuatTenderPageRoutingModule } from './buat-tender-routing.module';

import { BuatTenderPage } from './buat-tender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuatTenderPageRoutingModule
  ],
  declarations: [BuatTenderPage]
})
export class BuatTenderPageModule {}
