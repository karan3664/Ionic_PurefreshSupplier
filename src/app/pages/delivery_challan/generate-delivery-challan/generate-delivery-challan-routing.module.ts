import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateDeliveryChallanPage } from './generate-delivery-challan.page';

const routes: Routes = [
  {
    path: '',
    component: GenerateDeliveryChallanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateDeliveryChallanPageRoutingModule {}
