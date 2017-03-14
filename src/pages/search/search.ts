import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MediaService} from "../../providers/media-service";
import {LoginPage} from "../login/login";
import {AuthService} from "../../providers/auth-service";
import {MediaPlayerPage} from "../media-player/media-player";


/*
 Generated class for the Search page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  private resultList;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private media: MediaService,
              private auth: AuthService,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  ngOnChanges() {
  }

  search = (title) => {
    this.resultList = [];

    this.media.searchMedia(title)
      .subscribe(
        res => {
          for (let singleMedia of res) {
            this.resultList.push(singleMedia);
          }
        }, err => console.log(err)
      );
  };

  searchRes = () => {

  };

  showMedia = (id: number) => {
    this.navCtrl.push(MediaPlayerPage, {"id": id});
  };

  logout = () => {
    localStorage.removeItem("user");
    this.auth.removeUser();
    this.auth.logged = false;
    this.navCtrl.setRoot(LoginPage);
  };
}
