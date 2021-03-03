import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from "moment";

@Component({
  selector: 'app-receive-purchaseorder-request',
  templateUrl: './receive-purchaseorder-request.page.html',
  styleUrls: ['./receive-purchaseorder-request.page.scss'],
})
export class ReceivePurchaseorderRequestPage implements OnInit {
  TotalPrice = 0;
  data: [];
  id: any;
  total_po: any;
  FromDate: '';
  ToDate: '';
  constructor(private authService: AuthService,
    private route: Router,
    private loader: LoaderService,
    private toast: ToastService) {
  }

  ngOnInit() {
    this.getReceivePO();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getReceivePO();
    setTimeout(() => {
      // 
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  getReceivePO() {


    this.loader.loadingPresent();
    this.authService.ReceivePurchaseOrderRequestAPI_receive_po_list('', '').subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));

        if (res.error === false) {
          this.loader.loadingDismiss();
          this.data = res.result_ReceivePurchaseOrderRequestAPI_receive_po_list;
          this.total_po = this.data.length;
          for(let i = 0; i < this.data.length; i++){
            // this.sum += res.result_DeliveryChallanAPI_DCList[i].total_price;   
            this.TotalPrice  += Number(res.result_ReceivePurchaseOrderRequestAPI_receive_po_list[i].total_price);
           

          }
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

  ViewDetails(id) {
    this.route.navigate(['/home/receive_po/detail-purchaseorder', id]);
  }

  Delete(id) {

  }
  showdate() {
    // this.loader.loadingPresent();

    const date_dc_date = moment(this.FromDate).format('DD-MM-YYYY');
    const new_dc_date = date_dc_date.toString().substring(0, 10);

    const too_date = moment(this.ToDate).format('DD-MM-YYYY');
    const new_to_date = too_date.toString().substring(0, 10);

    this.loader.loadingPresent();
    this.authService.ReceivePurchaseOrderRequestAPI_receive_po_list(new_dc_date, new_to_date).subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));

        if (res.error === false) {
          this.loader.loadingDismiss();
          this.data = res.result_ReceivePurchaseOrderRequestAPI_receive_po_list;
          this.total_po = this.data.length;
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
}
