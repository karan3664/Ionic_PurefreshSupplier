import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PricingDetailsPage } from './pricing-details.page';

const routes: Routes = [
  {
    path: '',
    component: PricingDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PricingDetailsPageRoutingModule {}
