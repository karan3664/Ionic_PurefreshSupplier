import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryChallanPageRoutingModule } from './delivery-challan-routing.module';

import { DeliveryChallanPage } from './delivery-challan.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    DeliveryChallanPageRoutingModule
  ],
  declarations: [DeliveryChallanPage]
})
export class DeliveryChallanPageModule {}
