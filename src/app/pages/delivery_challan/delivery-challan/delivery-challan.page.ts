import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from "moment";

@Component({
  selector: 'app-delivery-challan',
  templateUrl: './delivery-challan.page.html',
  styleUrls: ['./delivery-challan.page.scss'],
})
export class DeliveryChallanPage implements OnInit {
  isItemAvailable: boolean = false;
  data: any[];
  id: any;
  total_dc: any;
  FromDate: '';
  ToDate: '';
  TotalPrice = 0;
  sum : any;

  constructor(private authService: AuthService,
    private route: Router,
    private loader: LoaderService,
    private toast: ToastService) {
    this.isItemAvailable = false;
    this.getDCRequest();
  }

  ngOnInit() {
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.getDCRequest();
    setTimeout(() => {
      // 
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  getDCRequest() {
    this.loader.loadingPresent();
    this.authService.DeliveryChallanAPI_DCList('', '').subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));

        if (res.error === false) {
          this.loader.loadingDismiss();
          this.data = res.result_DeliveryChallanAPI_DCList;
          this.total_dc = this.data.length;
          
          for(let i = 0; i < this.data.length; i++){
            // this.sum += res.result_DeliveryChallanAPI_DCList[i].total_price;   
            this.TotalPrice  += Number(this.data[i].total_price);
           

          }
         
          // return  this.TotalPrice;

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
  Edit(po_id) {
    console.log('Karan=>' + po_id);
    this.route.navigate(['/home/delivery_challan/edit-delivery-challan', po_id]);
  }
  NewDC() {
    this.route.navigate(['/home/delivery_challan/generate-delivery-challan']);
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
    this.authService.DeliveryChallanAPI_DCList(new_dc_date, new_to_date).subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));

        if (res.error === false) {
          this.loader.loadingDismiss();
          this.data = res.result_DeliveryChallanAPI_DCList;
          this.total_dc = this.data.length;
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
