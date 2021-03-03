import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { HomeGuard } from '../guards/home.guard';
import { UserDataResolver } from '../resolvers/userData.resolver';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver
    },
    children: [

      {
        path: 'supplier/dashboard',
        loadChildren: () => import('../pages/supplier/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'supplier/pricing-details/:id',
        loadChildren: () => import('../pages/supplier/pricing-details/pricing-details.module').then(m => m.PricingDetailsPageModule)
      },
      {
        path: 'supplier/new-product',
        loadChildren: () => import('../pages/supplier/new-product/new-product.module').then(m => m.NewProductPageModule)
      },
      {
        path: 'receive_po/receive-purchaseorder-request',
        loadChildren: () => import('../pages/receive_po/receive-purchaseorder-request/receive-purchaseorder-request.module').then(m => m.ReceivePurchaseorderRequestPageModule)
      },
      {
        path: 'receive_po/detail-purchaseorder/:id',
        loadChildren: () => import('../pages/receive_po/detail-purchaseorder/detail-purchaseorder.module').then(m => m.DetailPurchaseorderPageModule)
      },
      {
        path: 'delivery_challan/delivery-challan',
        loadChildren: () => import('../pages/delivery_challan/delivery-challan/delivery-challan.module').then(m => m.DeliveryChallanPageModule)
      },
      {
        path: 'delivery_challan/generate-delivery-challan',
        loadChildren: () => import('../pages/delivery_challan/generate-delivery-challan/generate-delivery-challan.module').then(m => m.GenerateDeliveryChallanPageModule)
      },
      {
        path: 'delivery_challan/edit-delivery-challan/:po_id',
        loadChildren: () => import('../pages/delivery_challan/edit-delivery-challan/edit-delivery-challan.module').then( m => m.EditDeliveryChallanPageModule)
      }
      ,
      {
        path: 'delivery_challan/add-product',
        loadChildren: () => import('../pages/delivery_challan/add-product/add-product-routing.module').then( m => m.AddProductPageRoutingModule)
      }
    ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRouter { }

