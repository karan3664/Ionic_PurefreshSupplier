import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateDeliveryChallanPageRoutingModule } from './generate-delivery-challan-routing.module';

import { GenerateDeliveryChallanPage } from './generate-delivery-challan.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    TranslateModule.forChild(),
    GenerateDeliveryChallanPageRoutingModule
  ],
  declarations: [GenerateDeliveryChallanPage]
})
export class GenerateDeliveryChallanPageModule { }
