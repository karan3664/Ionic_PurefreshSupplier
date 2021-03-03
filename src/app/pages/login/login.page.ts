import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoaderService } from 'src/app/services/loader.service';
// import { Events } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  postData = {
    username: '',
    password: ''
  };
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
    private loader: LoaderService,
    public alertController: AlertController,
    public navCtrl: NavController,
    // public events: Events
  ) { }

  ngOnInit() {
  }
  validateInputs() {
    const username = this.postData.username.trim();
    const password = this.postData.password.trim();
    return (
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
    );
  }

  formLogin() {
    if (this.validateInputs()) {
      this.loader.loadingPresent();
      console.log(this.postData);
      const value = {
        username: this.postData.username,
        password: this.postData.password
      };
      console.log(JSON.stringify(value));
      this.authService.Login(value).subscribe(
        (res: any) => {
          console.log('Login Data =>' + JSON.stringify(res));
          if (res.error === false) {
            this.loader.loadingDismiss();
            // Storing the User data.
            // this.storageService.store(AuthConstants.AUTH, res.logindata);

            this.storageService.setData(res)
            localStorage.setItem('token', res.token);
            this.router.navigate(['home/supplier/dashboard']);
            // this.events.publish('login',true);
            // this.events.publish('login1',true);
            // this.navCtrl.navigateRoot('home/supplier/dashboard');

          } else {
            this.loader.loadingDismiss();
            this.toastService.presentToast(res['msg']);
          }
        },
        (error: any) => {
          this.loader.loadingDismiss();
          this.toastService.presentToast('Network Issue.');
        }
      );
    } else {
      this.loader.loadingDismiss();
      this.toastService.presentToast('Please enter username or password.');
    }
  }
}
