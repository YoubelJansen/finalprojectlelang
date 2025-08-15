import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiddingPenilaianPageRoutingModule } from './bidding-penilaian-routing.module';

import { BiddingPenilaianPage } from './bidding-penilaian.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiddingPenilaianPageRoutingModule
  ],
  declarations: [BiddingPenilaianPage]
})
export class BiddingPenilaianPageModule {}
