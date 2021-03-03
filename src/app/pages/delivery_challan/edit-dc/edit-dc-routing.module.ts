import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDcPage } from './edit-dc.page';

const routes: Routes = [
  {
    path: '',
    component: EditDcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDcPageRoutingModule {}
