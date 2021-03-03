import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceivePurchaseorderRequestPageRoutingModule } from './receive-purchaseorder-request-routing.module';

import { ReceivePurchaseorderRequestPage } from './receive-purchaseorder-request.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    ReceivePurchaseorderRequestPageRoutingModule
  ],
  declarations: [ReceivePurchaseorderRequestPage]
})
export class ReceivePurchaseorderRequestPageModule {}
