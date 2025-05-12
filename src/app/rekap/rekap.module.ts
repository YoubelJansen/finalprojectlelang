import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RekapPageRoutingModule } from './rekap-routing.module';

import { RekapPage } from './rekap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RekapPageRoutingModule
  ],
  declarations: [RekapPage]
})
export class RekapPageModule {}
