import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TenderPageRoutingModule } from './tender-routing.module';

import { TenderPage } from './tender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TenderPageRoutingModule
  ],
  declarations: [TenderPage]
})
export class TenderPageModule {}
