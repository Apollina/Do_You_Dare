import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { AuthService } from './../../providers/auth-service';
import { MediaService } from './../../providers/media-service';
import { LikeService } from './../../providers/like-service';


@Component({
  selector: 'page-media-player',
  templateUrl: 'media-player.html'
})
export class MediaPlayerPage {

  private id: number;
  private clickedMedia: any = {};
  private favouriteList: any = [];

  private hasLiked: boolean = false;

  constructor(
    public param: NavParams,
    private mediaService: MediaService,
    private favouriteService: LikeService,
    private authService: AuthService) {
    this.id = this.param.get("id");
  }

  ionViewWillEnter() {

    this.mediaService.getMediaByID(this.id)
      .subscribe(
        res => {
          this.clickedMedia = res;
          this.mediaService.getUserByID(this.clickedMedia.user_id)
            .subscribe(
              resp => {
                this.clickedMedia.username = resp.username;
              });
          console.log(this.clickedMedia);
        });

    this.favouriteService.getFavouriteByFile(this.id)
      .subscribe(
        res => {
          this.favouriteList = res;
          console.log(this.favouriteList);
          for (let favourite of this.favouriteList) {
            if (this.authService.getUserInfo().user_id === favourite.user_id) {
              this.hasLiked = true;
            }
          }
        });

  }
    putLike = () => {
      if (!this.hasLiked) {
        let param: any = {};
        param.file_id = +this.id;
        this.favouriteService.createFavorite(param)
          .subscribe(res => {
            this.hasLiked = !this.hasLiked;
          });
      } else {
        this.favouriteService.deleteFavorite(this.id)
          .subscribe(res => {
            this.hasLiked = !this.hasLiked;
          });
      }
    };
}
