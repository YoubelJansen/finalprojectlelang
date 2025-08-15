import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProsesAanwijzingPageRoutingModule } from './proses-aanwijzing-routing.module';

import { ProsesAanwijzingPage } from './proses-aanwijzing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProsesAanwijzingPageRoutingModule
  ],
  declarations: [ProsesAanwijzingPage]
})
export class ProsesAanwijzingPageModule {}
