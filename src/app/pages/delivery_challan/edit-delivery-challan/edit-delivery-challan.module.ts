import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDeliveryChallanPageRoutingModule } from './edit-delivery-challan-routing.module';

import { EditDeliveryChallanPage } from './edit-delivery-challan.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    EditDeliveryChallanPageRoutingModule
  ],
  declarations: [EditDeliveryChallanPage]
})
export class EditDeliveryChallanPageModule {}
