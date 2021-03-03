import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDeliveryChallanPage } from './edit-delivery-challan.page';

const routes: Routes = [
  {
    path: '',
    component: EditDeliveryChallanPage,
    children: [

      {
        path: 'edit-dc',
        loadChildren: () => import('../edit-dc/edit-dc.module').then(m => m.EditDcPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDeliveryChallanPageRoutingModule { }
