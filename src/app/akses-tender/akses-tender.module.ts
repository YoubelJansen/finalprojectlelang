import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AksesTenderPageRoutingModule } from './akses-tender-routing.module';

import { AksesTenderPage } from './akses-tender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AksesTenderPageRoutingModule
  ],
  declarations: [AksesTenderPage]
})
export class AksesTenderPageModule {}
