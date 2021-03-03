import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {
  isReadonly() {
    return true;
  }
  data: any[];
  FruitList: any;
  FruitList_temp: any;
  UnitList: any[];
  UnitList_temp: any;
  DataStatus: any;
  showFruitList: any;
  showUnitList: any;

  SelectedQty: any;
  SelectedFruit: any;
  id: any;
  supplier_id: '';

  constructor(private authService: AuthService,
    private route: Router,
    private loader: LoaderService,
    public storageService: StorageService,
    private toast: ToastService) {
    this.storageService.getData().then(res => {
      console.log("Values => " + JSON.stringify(res.result.id));
      this.id = JSON.stringify(res.result.id);
      this.supplier_id = this.id;
    });
    setTimeout(() => {
      this.getPORequest();
    }, 1000);

  }

  ngOnInit() {

  }
  getPORequest() {
    this.loader.loadingPresent();
    const data = {
      search: '',
      supplier_id: this.supplier_id
    }

    console.log("PORequest Data =>" + JSON.stringify(data));

    this.authService.ProductsAutoCompleteForSupplier(data).subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));

        if (res.error === false) {
          this.loader.loadingDismiss();
          this.FruitList = res.result_ProductsAutoCompleteForSupplier;
          this.FruitList_temp = res.result_ProductsAutoCompleteForSupplier;
          // this.UnitList = res.result_ProductsAutoCompleteForSupplier;
          // this.UnitList_temp = res.result_ProductsAutoCompleteForSupplier;
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
    console.log(JSON.stringify(ev));
    // Reset items back to all of the items
    this.FruitList = this.FruitList_temp;
    this.data = [];
    const val = ev;
    console.log("Value " + val);

    if (val == undefined || val === null || val.trim() == '') {
      this.FruitList = this.FruitList_temp;
    } else if (val && val.trim() != '') {
      this.data = this.FruitList_temp.filter((item) => {
        return (item.product_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });

      console.log("Size" + this.FruitList_temp.length);
      if (this.data.length == 0) {
        this.DataStatus = 1;
      } else {
        this.DataStatus = 0;
      }
    }
  }

  // getUnitItems(ev: any) {
  //   console.log(JSON.stringify(ev));
  //   // Reset items back to all of the items
  //   this.UnitList = this.UnitList_temp;
  //   const val = ev;
  //   console.log("Value " + val);

  //   if (val == undefined || val.trim() == '') {
  //     this.UnitList = this.UnitList_temp;
  //   } else if (val && val.trim() != '') {
  //     this.UnitList = this.UnitList_temp.filter((item) => {
  //       return (item.unit_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     });

  //     console.log("Size" + this.UnitList_temp.length);
  //     if (this.UnitList.length == 0) {
  //       this.DataStatus = 1;
  //     } else {
  //       this.DataStatus = 0;
  //     }
  //   }
  // }
  checkFocus(flag: any) {
    if (flag == 'icon') {
      this.showFruitList = !this.showFruitList;
      this.showUnitList = false;

    } else {
      this.showFruitList = true;
      this.showUnitList = false;

    }

  }
  checkFocus2(flag: any) {
    if (flag == 'icon') {
      this.showUnitList = !this.showUnitList;
      this.showFruitList = false;
    } else {
      this.showUnitList = true;
      this.showFruitList = false;
    }
  }

  setdata(data) {
    console.log(data)
    this.UnitList = [];
    this.SelectedFruit = data.product_name;
    this.SelectedQty = data.unit_name;
    this.UnitList.push(data);
    this.showFruitList = false;
    this.showUnitList = false;
  }

  setdata2(data) {
    this.UnitList = [];
    console.log(data)
    this.SelectedQty = data.unit_name;

    this.UnitList.push(data);
    this.showFruitList = false;
    this.showUnitList = false;
  }

  submitNewProduct() {
    console.log(this.UnitList);

    this.loader.loadingPresent();
    const data = {
      product_id: this.UnitList[0].id,
      supplier_id: this.supplier_id,
      unit_id: this.UnitList[0].unit_id
    }
    console.log(data);
    this.authService.SupplierProductsAPI_store(data).subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));

        if (res.error === false) {
          this.SelectedFruit = '';
          this.SelectedQty = '';
          this.loader.loadingDismiss();
          this.toast.presentToast(res.msg);
          this.route.navigateByUrl('home/supplier/dashboard');
        }
        else {
          this.loader.loadingDismiss();
          this.toast.presentToast(res.msg);
        }


      },
      (error: any) => {

        this.loader.loadingDismiss();
        this.toast.presentToast('Network Issue' + error);
      }

    );
  }

}
