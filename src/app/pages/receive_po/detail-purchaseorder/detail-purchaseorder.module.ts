import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPurchaseorderPageRoutingModule } from './detail-purchaseorder-routing.module';

import { DetailPurchaseorderPage } from './detail-purchaseorder.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    DetailPurchaseorderPageRoutingModule
  ],
  declarations: [DetailPurchaseorderPage]
})
export class DetailPurchaseorderPageModule {}
