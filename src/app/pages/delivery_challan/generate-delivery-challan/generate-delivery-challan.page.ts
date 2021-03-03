import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from "moment";

@Component({
  selector: 'app-generate-delivery-challan',
  templateUrl: './generate-delivery-challan.page.html',
  styleUrls: ['./generate-delivery-challan.page.scss'],
})
export class GenerateDeliveryChallanPage implements OnInit {
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
  billing_city: any;
  billing_state: any;
  delivery_city: any;
  delivery_state: any;
  billing_zipcode: any;
  billing_zipcode_name: any;
  delivery_zipcode_name: any;
  billing_address: any;
  delivery_zipcode: any;
  delivery_address: any;
  transporter: any;
  SelectedFruit: any;
  today: any = new Date().toISOString();
  po_id: any;
  from_user_id: any;
  to_user_id: any;
  transporter_id: any;
  vehicle_no: any;
  mode_of_transport: any;

  filtermonthwise: '';
  Retailers: any[];
  amount: any;
  retailer_id = "";
  constructor(private authService: AuthService,
    private route: Router,
    private loader: LoaderService,
    private toast: ToastService) {
    this.getPORequest();
    // this.today = new Date();
    // if(this.amount == 0)
    this.RetailerList();
  }

  ngOnInit() {


  }

  getPORequest() {
    this.loader.loadingPresent();
    const data = {
      search: ''
    }
    this.authService.ReceivePOAutoComplete(data).subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));

        if (res.error === false) {
          this.loader.loadingDismiss();
          this.FruitList = res.result_ReceivePOAutoComplete;
          this.FruitList_temp = res.result_ReceivePOAutoComplete;
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
        return (item.code.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });

      console.log("Size" + this.FruitList_temp.length);
      if (this.data.length == 0) {
        this.DataStatus = 1;
      } else {
        this.DataStatus = 0;
      }
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
    this.SelectedFruit = data.code;
    this.billing_zipcode_name = data.billing_zipcode_name;
    this.billing_address = data.billing_address;
    this.delivery_zipcode_name = data.delivery_zipcode_name;
    this.delivery_address = data.delivery_address;
    this.billing_city = data.billing_city;
    this.billing_state = data.billing_state;
    this.delivery_city = data.delivery_city;
    this.delivery_state = data.delivery_state;
    this.transporter = data.transporter;
    this.po_id = data.id;
    this.from_user_id = data.from_user_id;
    this.to_user_id = data.to_user_id;
    this.transporter_id = data.transporter_id;

    this.billing_zipcode = data.billing_zipcode;
    this.delivery_zipcode = data.delivery_zipcode;

    this.UnitList.push(data);
    this.showFruitList = false;
    this.showUnitList = false;
  }

  setdata2(data) {
    this.UnitList = [];
    console.log(data)
    this.billing_zipcode_name = data.billing_zipcode_name;
    this.billing_address = data.billing_address;
    this.delivery_zipcode_name = data.delivery_zipcode_name;
    this.delivery_address = data.delivery_address;
    this.billing_city = data.billing_city;
    this.billing_state = data.billing_state;
    this.delivery_city = data.delivery_city;
    this.delivery_state = data.delivery_state;
    this.transporter = data.transporter;
    this.po_id = data.id;
    this.from_user_id = data.from_user_id;
    this.to_user_id = data.to_user_id;
    this.transporter_id = data.transporter_id;
    this.billing_zipcode = data.billing_zipcode;
    this.delivery_zipcode = data.delivery_zipcode;

    this.UnitList.push(data);
    this.showFruitList = false;
    this.showUnitList = false;
  }

  sumbitDCValue() {
    this.loader.loadingPresent();
    const date_dc_date = moment(this.today).format('DD/MM/YYYY');
    const new_dc_date = date_dc_date.toString().substring(0, 10);

    const date_dispatch_date = moment(this.today).format('DD/MM/YYYY');
    const new_dispatch_date = date_dispatch_date.toString().substring(0, 10);



    const input = {
      from_user_id: this.to_user_id,
      to_user_id: this.from_user_id,
      po_id: this.po_id,
      dc_date: new_dc_date,
      billing_zipcode: this.billing_zipcode,
      delivery_zipcode: this.delivery_zipcode,
      billing_address: this.billing_address,
      delivery_address: this.delivery_address,
      transporter_id: this.transporter_id,
      dispatch_date: new_dispatch_date,
      vehicle_no: this.vehicle_no,
      mode_of_transport: this.mode_of_transport,
      custom_trans: '',
      trans_name: '',
      trans_phone: '',
      trans_email: '',
      retailer_id: this.retailer_id,
      for_retailer: this.amount
    }
    console.log('Store Value =>' + JSON.stringify(input));
    this.authService.DeliveryChallanAPI_store(input).subscribe(
      (res: any) => {
        console.log(res);
        if (res.error === false) {
          this.loader.loadingDismiss();
          // this.toast.presentToast(res.msg);
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

  SelectRet(value) {
    console.log(value);

  }
  RetailerChange(value) {
    console.log(value.id);
    this.retailer_id = value.id;

  }
  RetailerList() {

    this.authService.RetailerList().subscribe(
      (res: any) => {
        console.log(res);
        if (res.error === false) {
          // this.loader.loadingDismiss();
          this.Retailers = res.result_RetailerList;
          // this.toast.presentToast(res.msg);
        } else {
          // this.loader.loadingDismiss();
          this.toast.presentToast(res.msg);
        }



      },
      (error: any) => {
        // this.loader.loadingDismiss();
        this.toast.presentToast(JSON.stringify(error.error.errors));
      }
    );
  }
}
