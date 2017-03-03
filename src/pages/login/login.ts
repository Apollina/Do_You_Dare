import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;

  private currentUser: any = {};
  private dataFromServer: any = {};

  constructor(private navCtrl: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

  public createAccount() {
    this.navCtrl.push(RegisterPage);
  };


  public login = (value: any) => {

      this.showLoading();

      this.auth.setUser(value);

      this.auth.login().subscribe(resp => {
          console.log(resp);
          if (resp) {
            this.dataFromServer = resp;
            this.currentUser = this.dataFromServer.user;
            this.auth.setUser(this.currentUser);
            this.currentUser.token = this.dataFromServer.token;
            console.log(this.currentUser);
            localStorage.setItem("user", JSON.stringify(this.currentUser));
            this.auth.logged = true;
            console.log("Login Succeeded");
            setTimeout(() => {
              this.loading.dismiss();
              this.navCtrl.setRoot(HomePage)
            });
          }
          else {
            this.showError("Access Denied");
          }
        },
      error => {
        this.showError(error);

      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'crescent'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
