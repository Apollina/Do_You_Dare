import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import {AuthService} from "./auth-service";

@Injectable()
export class MediaService {

  private url: string = 'http://media.mw.metropolia.fi/wbma';
  private token: string = '';

  constructor(public http: Http, private authService: AuthService) {}

  getMedia = () => {
    return this.http.get(this.url + '/media')
      .map(
        res =>
          res.json()
      );
  };

  getMediaByID = (id: number) => {
    return this.http.get(this.url + '/media/' + id)
      .map(
        res =>
          res.json()
      );
  };

  getUserByID = (id: number) => {
    this.token = this.authService.getUserInfo().token;
    return this.http.get(this.url + '/users/' + id + '?token=' + this.token)
      .map(
        res =>
          res.json()
      );
  };

  uploadMedia = (formContent: any) => {
    this.token = this.authService.getUserInfo().token;
    return this.http.post(this.url + '/media?token=' + this.token, formContent)
      .map(
        res =>
          res.json()
      );
  };

}
