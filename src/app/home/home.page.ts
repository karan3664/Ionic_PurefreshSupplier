import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { TranslateConfigService } from '../services/translate-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Supplier Products',
      url: '/home/supplier/dashboard',
      icon: 'assets/supplier.svg'
    },
    {
      title: 'Recevie Purchase Order Request',
      url: '/home/receive_po/receive-purchaseorder-request',
      icon: 'assets/cart.svg'

    },
    {
      title: 'Delivery Challan',
      url: '/home/delivery_challan/delivery-challan',
      icon: 'assets/truck.svg'

    }

  ];
  name = "";
  public footerLabel = [
    {
      title: 'LOGOUT',
      icon: 'power-outline'
    }
  ]
  selectedLanguage: string;
  constructor(public authService: AuthService,
    private translateConfigService: TranslateConfigService,
    public storageService: StorageService) {
    this.storageService.getData().then(res => {
      this.name = res.result.name;
    });
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  Logout() {
    this.authService.logout();

  }
}
