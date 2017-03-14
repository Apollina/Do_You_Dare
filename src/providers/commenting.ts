import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from "./auth-service";


/*
 Generated class for the Comment provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Commenting {

  private url: string = 'http://media.mw.metropolia.fi/wbma';
  private token: string = '';

  constructor(public http: Http, private auth: AuthService) {
    console.log('Hello Comment Provider');
  }

  getCommentsOfId = (id: number) => {
    return this.http.get(this.url + '/comments/file/' + id)
      .map(
        res =>
          res.json()
      );
  }

  postComment = (data) => {
    this.token = this.auth.getUserInfo().token;
    return this.http.post(this.url + '/comments?token=' + this.token, data)
      .map(
        res =>
          res.json()
      );
  }

  deleteComment = (id) => {
    this.token = this.auth.getUserInfo().token;
    return this.http.delete(this.url + '/comments/' + id + '?token=' + this.token)
      .map(
        res =>
          res.json()
      );
  }
}
