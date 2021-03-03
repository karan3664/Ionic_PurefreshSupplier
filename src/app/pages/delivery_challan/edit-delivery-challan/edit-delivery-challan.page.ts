import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from "moment";
import { ModalController } from '@ionic/angular';
import { EditDcPage } from '../edit-dc/edit-dc.page';
import { AddProductPage } from '../add-product/add-product.page';


@Component({
  selector: 'app-edit-delivery-challan',
  templateUrl: './edit-delivery-challan.page.html',
  styleUrls: ['./edit-delivery-challan.page.scss'],
})
export class EditDeliveryChallanPage implements OnInit {
  isReadonly() {
    return true;
  }
  segment: string;
  po_id: any;
  new_po_id: any;
  to_user_id: any;
  dc_id: any;
  postData: any = {
    id: '',
    code: '',
    code_ref: '',
    po_id: '',
    from_user_id: '',
    to_user_id: '',
    dc_date: '',
    dispatch_date: '',
    billing_zipcode: '',
    billing_address: '',
    delivery_zipcode: '',
    delivery_address: '',
    transporter_id: '',
    vehicle_no: '',
    mode_of_transport: '',
    total_price: '',
    total_qty: '',
    total_items: '',
    status: '',
    custom_trans: '',
    trans_name: '',
    trans_email: '',
    trans_phone: '',
    po_no: '',
    to_name: '',
    transporter: '',
    billing_zipcode_name: '',
    billing_city: '',
    billing_state: '',
    delivery_zipcode_name: '',
    delivery_city: '',
    delivery_state: ''
  };
  new_dc_date: any;
  data: any[];
  filtermonthwise: '';
  Retailers: any[];
  amount: any;
  retailer_id = "";
  constructor(private authService: AuthService,
    private loader: LoaderService,
    private toast: ToastService,
    private route: Router,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute) {
    this.po_id = this.activatedRoute.snapshot.paramMap.get('po_id');
    console.log(this.po_id);
    this.segment = 'update_dc';
    this.UpdateDc();
    this.RetailerList();
  }

  ngOnInit() {
  }

  UpdateDc() {

    this.loader.loadingPresent();

    this.authService.DeliveryChallanAPI_view(this.po_id).subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        if (res.error === false) {

          this.loader.loadingDismiss();
          this.postData = res.result_DeliveryChallanAPI_edit.dc_header;
          this.data = res.result_DeliveryChallanAPI_edit.dc_items;
          this.dc_id = res.result_DeliveryChallanAPI_edit.dc_header.id;
          this.new_po_id = res.result_DeliveryChallanAPI_edit.dc_header.po_id;
          this.to_user_id = res.result_DeliveryChallanAPI_edit.dc_header.to_user_id;
          if (res.result_DeliveryChallanAPI_edit.dc_header.retailer_id != null) {
            this.retailer_id = res.result_DeliveryChallanAPI_edit.dc_header.retailer_id;
          }
          if (res.result_DeliveryChallanAPI_edit.dc_header.for_retailer == 0) {
            this.amount = '0'
          }
          else {
            this.amount = '1'
          }
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

  sumbitDCValue() {
    this.loader.loadingPresent();
    const date_dc_date = moment(this.postData.dc_date).format('DD/MM/YYYY');
    const new_dc_date = date_dc_date.toString().substring(0, 10);

    const date_dispatch_date = moment(this.postData.dispatch_date).format('DD/MM/YYYY');
    const new_dispatch_date = date_dispatch_date.toString().substring(0, 10);



    const data = {
      // from_user_id: this.postData.from_user_id,
      // to_user_id: this.postData.to_user_id,
      po_id: this.postData.po_id,
      dc_date: new_dc_date,
      billing_zipcode: this.postData.billing_zipcode,
      delivery_zipcode: this.postData.delivery_zipcode,
      billing_address: this.postData.billing_address,
      delivery_address: this.postData.delivery_address,
      transporter_id: this.postData.transporter_id,
      dispatch_date: new_dispatch_date,
      vehicle_no: this.postData.vehicle_no,
      mode_of_transport: this.postData.mode_of_transport,
      custom_trans: this.postData.custom_trans,
      trans_name: this.postData.trans_name,
      trans_phone: this.postData.trans_phone,
      trans_email: this.postData.trans_email,
      retailer_id: '',
      for_retailer: '0'
    }
    console.log('Store Value =>' + JSON.stringify(data));
    this.authService.DeliveryChallanAPI_update(this.dc_id, data).subscribe(
      (res: any) => {
        console.log(res);
        if (res.error === false) {
          this.loader.loadingDismiss();
          this.toast.presentToast(res.msg);
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

  async  Edit_DC(id, dc_id, po_id, to_user_id, product_name, variation_value) {
    console.log(id + "--" + dc_id + "--" + po_id + "--" + to_user_id);
    const modal = await this.modalController.create({
      component: EditDcPage,
      componentProps: {
        'id': id,
        'dc_id': dc_id,
        'po_id': po_id,
        'to_user_id': to_user_id,
        'Name': product_name,
        'variation_value': variation_value
      }
    });
    return await modal.present();

  }

  DeleteDCProduct(id, dc_id) {

    this.loader.loadingPresent();

    this.authService.DeliveryChallanAPI_delete_dc_item(id, dc_id).subscribe(
      async (res: any) => {
        console.log(JSON.stringify(res));
        if (res.error === false) {

          this.loader.loadingDismiss();
          this.UpdateDc();

          this.toast.presentToast(res.msg);


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
  async  AddProduct() {
    console.log(this.dc_id);

    const modal = await this.modalController.create({
      component: AddProductPage,
      componentProps: {
        'po_id': this.new_po_id,
        'dc_id': this.dc_id,
        'to_user_id': this.to_user_id
      }
    });
    return await modal.present();

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
          this.Retailers = res.result_RetailerList;
          // this.toast.presentToast(res.msg);
        } else {
          this.toast.presentToast(res.msg);
        }



      },
      (error: any) => {
        this.toast.presentToast(JSON.stringify(error.error.errors));
      }
    );
  }
}
