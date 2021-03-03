import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-detail-purchaseorder',
  templateUrl: './detail-purchaseorder.page.html',
  styleUrls: ['./detail-purchaseorder.page.scss'],
})
export class DetailPurchaseorderPage implements OnInit {

  id: any;
  data: [];
  isReadonly() {
    return true;
  }
  postData = {
    to_name: '',
    billing_zipcode_name: '',
    billing_city: '',
    billing_state: '',
    billing_address: '',
    po_date: '',
    delivery_zipcode: '',
    delivery_city: '',
    delivery_state: '',
    delivery_address: '',
    accepted_or_rejected: '',


  }
  transporterData = {
  
    charges: ''
  }

  POITEMS: any;
  segment: string;
  constructor(private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private loader: LoaderService,
    private toast: ToastService) {
    this.segment = 'view_po';
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {

    this.getDetails();
  }

  getDetails() {
    this.loader.loadingPresent();
    this.authService.ReceivePurchaseOrderRequestAPI_show(this.id).subscribe(
      (res: any) => {
        console.log(res.result_ReceivePurchaseOrderRequestAPI_show.po_header);
        if (res.error === false) {
          this.loader.loadingDismiss();
          this.data = res.po_header;
          this.postData = res.result_ReceivePurchaseOrderRequestAPI_show.po_header;
          this.transporterData = res.result_ReceivePurchaseOrderRequestAPI_show.trans;
          this.POITEMS = res.result_ReceivePurchaseOrderRequestAPI_show.pro_items;
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
    // this.postData.Suppliers = JSON.stringify(this.data['to_name']);
  }

  sumbitPOValue() {
    this.loader.loadingPresent();
    const data = {
      accepted_or_rejected: this.postData.accepted_or_rejected,
     
    }
    this.authService.ReceivePurchaseOrderRequestAPI_update_status(this.id, data).subscribe(
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
}
