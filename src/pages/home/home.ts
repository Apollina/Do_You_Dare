import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  username = '';
  email = '';
  constructor(private navCtrl: NavController, private login: AuthService) {
    let info = this.login.getUserInfo();
    this.username = info.username;
    this.email = info.email;
  }

  logout = () => {
    localStorage.removeItem("user");
    this.login.removeUser();
    this.login.logged = false;
    this.navCtrl.setRoot(LoginPage);
  }
}

