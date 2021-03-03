import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData$ = new BehaviorSubject<any>([]);
  constructor(private httpService: HttpService,
    private storageService: StorageService,
    private router: Router,
    public storage: Storage,
    public navCtrl: NavController) { }

  getUserData() {
    this.storageService.getData().then(res => {
      this.userData$.next(res);
    });
  }
  Login(postData): Observable<any> {
    return this.httpService.post('Login', postData);
  }
  SupplierProductsList(): Observable<any> {
    return this.httpService.get('SupplierProductsList');
  }
  SupplierProductsAPI_edit(id): Observable<any> {
    return this.httpService.get('SupplierProductsAPI_edit/' + id);
  }
  ReceivePurchaseOrderRequestAPI_update_status(id, data): Observable<any> {
    return this.httpService.postData('ReceivePurchaseOrderRequestAPI_update_status/' + id, data);
  }

  // start 

  ReceivePurchaseOrderRequestAPI_receive_po_list(from_date, to_date): Observable<any> {
    return this.httpService.get('ReceivePurchaseOrderRequestAPI_receive_po_list?from_date=' + from_date + '&' + 'to_date=' + to_date + '');

  }

  ReceivePurchaseOrderRequestAPI_show(id): Observable<any> {
    return this.httpService.get('ReceivePurchaseOrderRequestAPI_show/' + id);
  }
  SupplierProductsAPI_update(id, data): Observable<any> {
    return this.httpService.postData('SupplierProductsAPI_update/' + id, data);
  }
  ProductsAutoCompleteForSupplier(data): Observable<any> {
    return this.httpService.postData('ProductsAutoCompleteForSupplier', data);
  }
  SupplierProducts_destroy(id): Observable<any> {
    return this.httpService.get('SupplierProducts_destroy/' + id);
  }
  SupplierProductsAPI_store(data): Observable<any> {
    return this.httpService.postData('SupplierProductsAPI_store', data);
  }
  DeliveryChallanAPI_DCList(from_date, to_date): Observable<any> {
    return this.httpService.get('DeliveryChallanAPI_DCList?from_date=' + from_date + '&' + 'to_date=' + to_date + '');

  }
  DeliveryChallanAPI_view(id): Observable<any> {
    return this.httpService.get('DeliveryChallanAPI_view/' + id);
  }
  DeliveryChallanAPI_store(data): Observable<any> {
    return this.httpService.postData('DeliveryChallanAPI_store', data);
  }

  DeliveryChallanAPI_update(id, data): Observable<any> {
    return this.httpService.postData('DeliveryChallanAPI_update/' + id, data);
  }
  DeliveryChallanAPI_view_dc_items(id, data): Observable<any> {
    return this.httpService.postData('DeliveryChallanAPI_view_dc_items/' + id, data);
  }

  DeliveryChallanAPI_update_dc_item(id, data): Observable<any> {
    return this.httpService.postData('DeliveryChallanAPI_update_dc_item/' + id, data);
  }
  DeliveryChallanAPI_delete_dc_item(id, dc_id): Observable<any> {
    return this.httpService.get('DeliveryChallanAPI_delete_dc_item/' + id + '/' + dc_id);
  }
  ReceivePOAutoComplete(data): Observable<any> {
    return this.httpService.postData('ReceivePOAutoComplete', data);
  }

  ProductsAutoCompleteForDC(data): Observable<any> {
    return this.httpService.postData('ProductsAutoCompleteForDC', data);
  }
  GetAllQty(data): Observable<any> {
    return this.httpService.postData('GetAllQty', data);
  }
  DeliveryChallanAPI_store_dc_item(data): Observable<any> {
    return this.httpService.postData('DeliveryChallanAPI_store_dc_item', data);
  }

  RetailerList(): Observable<any> {
    return this.httpService.get('RetailerList');
  }

  logout() {
    this.storage.clear();
    // this.storageService.removeStorageItem(AuthConstants.AUTHWelcome).then(res => {
    //   this.welcomeData$.next('');
    // });
    // this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
    this.userData$.next('');
    // this.router.navigate(['']);
    this.navCtrl.navigateRoot('');
    // });
  }
}

