import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {UploadPage} from "../pages/upload/upload";
import { AuthService } from '../providers/auth-service';
import {BrowsePage } from "../pages/browse/browse";
import {MediaService } from "../providers/media-service";
import { LikeService } from "../providers/like-service"
import {MediaPlayerPage} from "../pages/media-player/media-player";
import { Thumbnail } from './../pipes/thumbnail';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    UploadPage,
    BrowsePage,
    Thumbnail,
    MediaPlayerPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    UploadPage,
    BrowsePage,
    MediaPlayerPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, MediaService, Thumbnail, LikeService ]
})
export class AppModule {}
