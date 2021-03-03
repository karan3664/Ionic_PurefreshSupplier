import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PricingDetailsPageRoutingModule } from './pricing-details-routing.module';

import { PricingDetailsPage } from './pricing-details.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    PricingDetailsPageRoutingModule
  ],
  declarations: [PricingDetailsPage]
})
export class PricingDetailsPageModule {}
