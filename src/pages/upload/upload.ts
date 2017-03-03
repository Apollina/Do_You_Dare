import { BrowsePage } from './../browse/browse';
import { MediaService } from './../../providers/media-service';
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {AuthService} from "../../providers/auth-service";

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage {

  private loading;
  createSuccess = false;

  constructor(public navCtrl: NavController, private uploadService: MediaService, private loadCtrl: LoadingController, private alertCtrl: AlertController, private auth:AuthService) { }

  upload = (event, value: any) => {
    this.showLoading("In process...");
    const fileElement = event.target.querySelector('input[type=file]');
    const file = fileElement.files[0];

    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', value.title);
    fd.append('description', value.description);

    this.uploadService.uploadMedia(fd)
      .subscribe(
        data => {
          if (data) {
            this.createSuccess = true;
            this.showPopup("Success", "File uploaded.");
          }
        }, err => {
          console.log(err);
          this.showPopup("Error", "Problem uploading file.");
        }
      );
  };

  showLoading = (message: string) => {
    this.loading = this.loadCtrl.create({
      content: message,
      dismissOnPageChange: true
    });
  };

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.push(BrowsePage);
            }
          }
        }
      ]
    });
    alert.present();
  }

  logout = () => {
    localStorage.removeItem("user");
    this.auth.removeUser();
    this.auth.logged = false;
    this.navCtrl.setRoot(LoginPage);
  };

}
