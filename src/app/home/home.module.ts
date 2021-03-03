import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavParams } from '@ionic/angular';
import { HomePage } from './home.page';
import { HomeRouter } from './home.router';
import { EditDcPage } from '../pages/delivery_challan/edit-dc/edit-dc.page';
import { AddProductPage } from '../pages/delivery_challan/add-product/add-product.page';
import { AddProductPageModule } from '../pages/delivery_challan/add-product/add-product.module';
import { EditDcPageModule } from '../pages/delivery_challan/edit-dc/edit-dc.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomeRouter,
    EditDcPageModule,
    TranslateModule.forChild(),
    AddProductPageModule],
  declarations: [HomePage],
  entryComponents: [EditDcPage, AddProductPage]

})
export class HomePageModule { }
