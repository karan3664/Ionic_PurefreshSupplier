import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  @Input() dc_id: string;
  @Input() po_id: string;
  @Input() to_user_id: string;
  isReadonly() {
    return true;
  }
  // po_id: '';
  postData: any[];
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

  purchase_order_items_id: any;
  product_id: any;
  delivered_qty: any;
  ordered_qty: any;
  remaining_qty: any;
  unit_name: any;
  code: any;
  price: any;
  total_price: any;
  qty: any;

  unit_id: any;
  variation_value_id: any;
  variation_id: any;
  // to_user_id: any;
  // dc_id: any;

  constructor(private authService: AuthService,
    private loader: LoaderService,
    private toast: ToastService,
    private route: Router,
    private modalController: ModalController,
    public navParams: NavParams,
    private activatedRoute: ActivatedRoute) {
    this.po_id = this.navParams.data.po_id;
    this.dc_id = this.navParams.data.dc_id;
    this.to_user_id = this.navParams.data.to_user_id;

    console.log(this.po_id);
    this.ProductSelect();
    // this.total_price = (this.price * this.qty);
  }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
  ProductSelect() {

    this.loader.loadingPresent();

    const data = {
      search: '',
      po_id: this.po_id

    }
    this.authService.ProductsAutoCompleteForDC(data).subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        if (res.error === false) {

          this.loader.loadingDismiss();
          this.FruitList = res.result_ProductsAutoCompleteForDC;
          this.FruitList_temp = res.result_ProductsAutoCompleteForDC;
          // this.toast.presentToast(res.msg);
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

  getQty(ev: any) {
    console.log(JSON.stringify('QTY >' + ev));
    const val = ev;
    console.log("Value " + val);

    if (val != null) {
      this.total_price = (val * this.price);
      console.log("Total Price " + this.total_price);

    }
    else {
      this.total_price = 0;
    }

  }
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
    this.SelectedFruit = data.product_name + ' ' + (data.variation_value);

    this.product_id = data.product_id;
    this.purchase_order_items_id = data.purchase_order_items_id;

    this.unit_name = data.unit_name;
    this.code = data.code;
    this.price = data.price;

    this.unit_id = data.unit_id;
    this.variation_value_id = data.variation_value_id;
    this.variation_id = data.variation_id;
    // this.to_user_id = data.to_user_id;
    // this.dc_id = data.dc_id;

    this.UnitList.push(data);
    this.GetAllQty();
    this.showFruitList = false;
    this.showUnitList = false;
  }

  setdata2(data) {
    this.UnitList = [];
    console.log(data)
    this.product_id = data.product_id;
    this.purchase_order_items_id = data.purchase_order_items_id;
    this.unit_name = data.unit_name;
    this.code = data.code;
    this.price = data.price;
    this.unit_id = data.unit_id;
    this.variation_value_id = data.variation_value_id;
    this.variation_id = data.variation_id;
    // this.to_user_id = data.to_user_id;
    // this.dc_id = data.dc_id;
    this.GetAllQty();
    this.UnitList.push(data);
    this.showFruitList = false;
    this.showUnitList = false;
  }

  GetAllQty() {

    this.loader.loadingPresent();

    const data = {
      search: '',
      po_id: this.po_id,
      product_id: this.product_id,
      purchase_order_items_id: this.purchase_order_items_id

    }
    this.authService.GetAllQty(data).subscribe(
      (res: any) => {
        console.log(JSON.stringify('GET All Qty =>' + JSON.stringify(res)));
        if (res.error === false) {

          this.loader.loadingDismiss();
          this.delivered_qty = res.result_GetAllQty.delivered_qty;
          this.ordered_qty = res.result_GetAllQty.ordered_qty;
          this.remaining_qty = res.result_GetAllQty.remaining_qty;
          // this.FruitList = res.result_ProductsAutoCompleteForDC;
          // this.FruitList_temp = res.result_ProductsAutoCompleteForDC;
          // this.toast.presentToast(res.msg);
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

  AddProduct() {
    this.loader.loadingPresent();
    const input = {
      dc_id: this.dc_id,
      po_id: this.po_id,
      to_user_id: this.to_user_id,
      product_id: this.product_id,
      variation_id: this.variation_id,
      variation_value_id: this.variation_value_id,
      purchase_order_items_id: this.purchase_order_items_id,
      qty: this.qty,
      price: this.price,
      unit_id: this.unit_id,
      remaining_qty: this.remaining_qty,
      delivered_qty: this.delivered_qty,
      ordered_qty: this.ordered_qty,
      total_price: this.total_price
    }

    console.log(JSON.stringify(input));

    this.authService.DeliveryChallanAPI_store_dc_item(input).subscribe(
      async (res: any) => {
        console.log(JSON.stringify(res));
        if (res.error === false) {
          this.ProductSelect();
          await this.modalController.dismiss();
          this.loader.loadingDismiss();
          this.toast.presentToast(res.msg);
        } else {
          this.loader.loadingDismiss();
          this.toast.presentToast(res.msg);
        }



      },
      (error: any) => {
        this.loader.loadingDismiss();
        this.toast.presentToast(JSON.stringify(error.error.errors));
      }
    );
  }
}

