import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import {MediaService} from "../../providers/media-service";
import {MediaPlayerPage} from "../media-player/media-player";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  username = '';
  email = '';
  userName ='';
  private mediaList: any = [];
  private userId: number;
  constructor(private navCtrl: NavController, private login: AuthService,  private media: MediaService) {
    let info = this.login.getUserInfo();
    this.username = info.username;
    this.email = info.email;
    this.userId = info.user_id;
    console.log(this.userId);
  }
  ionViewWillEnter() {
    this.media.getMediaByUser().subscribe(
      res => {
        this.mediaList = res;
        console.log(this.mediaList);
        console.log(this.userId);
      }
    );
  };

  logout = () => {
    localStorage.removeItem("user");
    this.login.removeUser();
    this.login.logged = false;
    this.navCtrl.setRoot(LoginPage);
  };
  showMedia = (id: number) => {
    this.navCtrl.push(MediaPlayerPage, { "id": id });
  };
}

