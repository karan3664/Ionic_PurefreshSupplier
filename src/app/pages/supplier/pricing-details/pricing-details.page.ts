import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { ParsedVariable } from '@angular/compiler';
import { variable } from '@angular/compiler/src/output/output_ast';
import { concat } from 'rxjs';

@Component({
  selector: 'app-pricing-details',
  templateUrl: './pricing-details.page.html',
  styleUrls: ['./pricing-details.page.scss'],
})
export class PricingDetailsPage implements OnInit {
  id: any;
  isReadonly() {
    return true;
  }

  postData: any = [{
    product_name: '',
    unit_name: ''
  }];

  ProductVariation: any = [];
  value: any = [];
  var_value: any[];
  pricing: any;
  priceItem: '';
  original_priceItem: '';
  newArray: any;
  Input: any;
  constructor(private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private loader: LoaderService,
    private toast: ToastService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getDetails();
  }
  getDetails() {
    this.loader.loadingPresent();
    this.authService.SupplierProductsAPI_edit(this.id).subscribe(
      (res: any) => {
        console.log("Pricing =>" + JSON.stringify(res));

        if (res.error === false) {
          this.loader.loadingDismiss();
          this.postData = res.result_SupplierProductsAPI_edit.row;
          this.ProductVariation = res.result_SupplierProductsAPI_edit.pricing_info.variations;
          this.pricing = res.result_SupplierProductsAPI_edit.pricing_info.price;
          this.priceItem = res.result_SupplierProductsAPI_edit.pricing_info.price;
          this.original_priceItem = res.result_SupplierProductsAPI_edit.pricing_info.price;
          console.log("ProductVariation => " + this.ProductVariation);
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
  submitPrice() {

    this.value = [];
    this.var_value = [];


    var myarray: any = []
    for (let i = 0; i < this.ProductVariation.length; i++) {
      const id = this.ProductVariation[i].variation_value_id;
      myarray.push({

        "price": this.ProductVariation[i].price,
        "original_price": this.ProductVariation[i].price,
        "variation_value_id": this.ProductVariation[i].variation_value_id,
        "variation_id": this.ProductVariation[i].variation_id,
        "qty": this.ProductVariation[i].qty,
        "original_qty": this.ProductVariation[i].qty
      })

    }

    console.log("myarray " + JSON.stringify(myarray));


    if (myarray.length != 0) {
      this.Input = {

        product_id: this.postData.product_id,
        supplier_id: this.postData.supplier_id,
        unit_id: this.postData.unit_id,
        variation: this.toObject(myarray)
      }
    }
    else {

      this.Input = {

        product_id: this.postData.product_id,
        supplier_id: this.postData.supplier_id,
        unit_id: this.postData.unit_id,
        price: this.priceItem,
        original_price: this.original_priceItem,
        qty: '',
        original_qty: ''
      }


    }

    console.log("input value" + JSON.stringify(this.Input));



    this.loader.loadingPresent();

    this.authService.SupplierProductsAPI_update(this.id, this.Input).subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        if (res.error === false) {
          this.loader.loadingDismiss();
          this.toast.presentToast(res.msg);
          this.route.navigateByUrl('home/supplier/dashboard');
        } else {
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



  toObject(input) {
    var rv = {};
    for (var i = 0; i < input.length; ++i) {
      var id = input[i].variation_value_id;
      rv[id] = input[i];
    } return rv;
  }
}
