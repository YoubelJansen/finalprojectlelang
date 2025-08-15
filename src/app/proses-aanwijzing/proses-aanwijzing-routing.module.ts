import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProsesAanwijzingPage } from './proses-aanwijzing.page';

const routes: Routes = [
  {
    path: '',
    component: ProsesAanwijzingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProsesAanwijzingPageRoutingModule {}
