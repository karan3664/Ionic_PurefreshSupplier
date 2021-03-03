import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceivePurchaseorderRequestPage } from './receive-purchaseorder-request.page';

const routes: Routes = [
  {
    path: '',
    component: ReceivePurchaseorderRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceivePurchaseorderRequestPageRoutingModule {}
