import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-edit-dc',
  templateUrl: './edit-dc.page.html',
  styleUrls: ['./edit-dc.page.scss'],
})
export class EditDcPage implements OnInit {
  @Input() id: string;
  @Input() dc_id: string;
  @Input() po_id: string;
  @Input() to_user_id: string;
  @Input() Name: string;
  @Input() variation_value: string;

  isReadonly() {
    return true;
  }
  
  postData: any = {
    id: '',
    dc_id: '',
    po_id: '',
    purchase_order_items_id: '',
    product_id: '',
    variation_id: '',
    variation_value_id: '',
    unit_id: '',
    qty: '',
    price: '',
    total_price: '',
    created_by: '',
    updated_by: '',
    created_at: '',
    updated_at: '',
    deleted_at: '',
    product_code: '',
    ordered_qty: '',
    product_name: '',
    unit_name: '',
    delivered_qty: '',
    remaining_qty: ''
  };
  constructor(private modalController: ModalController,
    public navParams: NavParams,
    private authService: AuthService,
    private loader: LoaderService,
    private toast: ToastService) {
      // navParams.get("imgSrc");
    this.id = this.navParams.get('id')
    this.dc_id = this.navParams.get('dc_id');
    this.po_id = this.navParams.get('po_id');
    this.to_user_id = this.navParams.get('to_user_id');
    this.Name = this.navParams.get('Name');
    this.variation_value = this.navParams.get('variation_value');

    console.log(JSON.stringify(this.id));
    
    this.ViewDCValue();
  }

  ngOnInit() {


  }
  async closeModal() {
    await this.modalController.dismiss();
  }

  ViewDCValue() {
    const Input = {
      dc_id: this.dc_id,
      po_id: this.po_id,
      to_user_id: this.to_user_id
    }


    this.loader.loadingPresent();

    this.authService.DeliveryChallanAPI_view_dc_items(this.id, Input).subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        if (res.error === false) {

          this.loader.loadingDismiss();
          this.postData = res.result_DeliveryChallanAPI_view_dc_items;
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

  UpdateDCValue() {
    const data = {
      dc_id: this.dc_id,
      po_id: this.po_id,
      to_user_id: this.to_user_id,
      product_id: this.postData.product_id,
      variation_id: this.postData.variation_id,
      variation_value_id: this.postData.variation_value_id,
      purchase_order_items_id: this.postData.purchase_order_items_id,
      qty: this.postData.qty,
      price: this.postData.price,
      unit_id: this.postData.unit_id,
      remaining_qty: this.postData.remaining_qty,
      delivered_qty: this.postData.delivered_qty,
      ordered_qty: this.postData.ordered_qty,
      total_price: this.postData.total_price,
      id: this.id
    }
    this.loader.loadingPresent();

    this.authService.DeliveryChallanAPI_update_dc_item(this.id, data).subscribe(
      async (res: any) => {
        console.log(JSON.stringify(res));
        if (res.error === false) {

          this.loader.loadingDismiss();
          await this.modalController.dismiss();
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
