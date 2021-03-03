import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDcPageRoutingModule } from './edit-dc-routing.module';

import { EditDcPage } from './edit-dc.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    EditDcPageRoutingModule
  ],
  declarations: [EditDcPage]
})
export class EditDcPageModule {}
