import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { AuthService } from './../../providers/auth-service';
import {MediaService} from "../../providers/media-service";
import {LikeService} from "../../providers/like-service";
import {Commenting} from "../../providers/commenting";


@Component({
  selector: 'page-commenting',
  templateUrl: 'commenting.html'
})
export class CommentingPage {

  private id: number;
  private commentList: any = [];

  private selectedMedia: any = {};



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private commentService: Commenting,
              private mediaService: MediaService,
              private auth: AuthService,
              private fav: LikeService) {
    this.id = this.navParams.get("id");
  }

  ionViewWillEnter() {

    this.mediaService.getMediaByID(this.id)
      .subscribe(
        res => {
          this.selectedMedia = res;
          this.selectedMedia.time = moment(this.selectedMedia.time_added).fromNow();

          this.mediaService.getUserByID(this.selectedMedia.user_id)
            .subscribe(
              resp => {
                this.selectedMedia.artist = resp.username;
              });

        },
      );

    this.displayComment();
  }

  back = () => {
    this.navCtrl.pop();
  };

  displayComment = () => {
    this.commentService.getCommentsOfId(this.id)
      .subscribe(
        res => {
          this.commentList = res;
          for (let comment of this.commentList) {
            this.mediaService.getUserByID(comment.user_id).subscribe(
              res => {
                comment.username = res.username;
                comment.time = moment(comment.time_added).fromNow();
              });
          }
        });
  };

  postComment = (value: any) => {
    let data = {"file_id": this.id, "comment": value.comment};
    this.commentService.postComment(data).subscribe(
      res => {
        console.log(res);
        this.displayComment();
      }, err => {
        console.log(err);
      });
  };
}
