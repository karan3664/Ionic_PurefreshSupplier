import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  isReadonly() {
    return true;
  }
  isItemAvailable: boolean = false;
  data: any[];
  id: any;
  total_product: any;
  FromDate: '';
  ToDate: '';
  constructor(private authService: AuthService,
    private route: Router,
    private loader: LoaderService,
    private toast: ToastService) {
    this.isItemAvailable = false;
    this.getPORequest();
  }

  ngOnInit() {

  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getPORequest();
    setTimeout(() => {
      // 
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  getPORequest() {
    this.loader.loadingPresent();
    this.authService.SupplierProductsList().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));

        if (res.error === false) {
          this.loader.loadingDismiss();
          this.data = res.result_SupplierProductsList;
          this.total_product = this.data.length;

        }
        else {
          this.toast.presentToast(res.msg);
        }


      },
      (error: any) => {

        this.loader.loadingDismiss();
        this.toast.presentToast('Network Issue');
      }

    );
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.getPORequest();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.data = this.data.filter((item) => {
        return (item.product_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  Pricing(id) {
    this.route.navigate(['/home/supplier/pricing-details', id]);
  }

  NewProduct() {
    this.route.navigate(['/home/supplier/new-product']);
  }
  Delete(id) {
    this.loader.loadingPresent();
    this.authService.SupplierProducts_destroy(id).subscribe(
      (res: any) => {
        console.log('Deleted Product =>' + JSON.stringify(res));
        if (res.error === false) {
          this.getPORequest();
          this.loader.loadingDismiss();
          this.toast.presentToast(res.msg);

        }
        else {
          this.loader.loadingDismiss();
          this.toast.presentToast(res.msg);
        }

      },
      (error: any) => {
        this.loader.loadingDismiss();
        this.toast.presentToast('Network Issue');
      }
    );
  }

  showdate() {

  }
}
