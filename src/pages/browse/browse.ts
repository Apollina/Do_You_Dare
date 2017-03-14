import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from './../login/login';
import { AuthService } from './../../providers/auth-service';
import { MediaService } from './../../providers/media-service';
import {MediaPlayerPage} from "../media-player/media-player";
import {LikeService} from "../../providers/like-service";
import { NavParams } from 'ionic-angular';
import {CommentingPage} from "../commenting/commenting";

@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html'
})
export class BrowsePage {

  private mediaList: any = [];
  private id: number;
  private hasLiked: boolean = false;

  constructor(public navCtrl: NavController, public param: NavParams, private media: MediaService, private auth: AuthService, private favouriteService: LikeService) { this.id = this.param.get("id") }

  ionViewWillEnter() {
    this.media.getMedia().subscribe(
      res => {
        this.mediaList = res;
        console.log(this.mediaList);
      }
    )
  };

  showMedia = (id: number) => {
    this.navCtrl.push(MediaPlayerPage, { "id": id });
  };

  logout = () => {
    localStorage.removeItem("user");
    this.auth.removeUser();
    this.auth.logged = false;
    this.navCtrl.setRoot(LoginPage);
  };

  navToCom = () => {
    this.navCtrl.push(CommentingPage, { "id": this.id });
  };

  putLike = () => {
    if (!this.hasLiked) {
      let param: any = {};
      param.file_id = +this.id;
      this.favouriteService.createFavorite(param)
        .subscribe(res => {
          this.hasLiked = true;
        });
    } else {
      this.favouriteService.deleteFavorite(this.id)
        .subscribe(res => {
          this.hasLiked = false;
        });
    }
  };
}





