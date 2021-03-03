import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewProductPageRoutingModule } from './new-product-routing.module';

import { NewProductPage } from './new-product.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    IonicModule,
    NewProductPageRoutingModule
  ],
  declarations: [NewProductPage]
})
export class NewProductPageModule {}
