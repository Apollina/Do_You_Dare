import { AuthService } from './auth-service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LikeService {

  private url: string = 'http://media.mw.metropolia.fi/wbma';
  private token: string = '';

  constructor(public http: Http, private auth: AuthService) {}

  getFavouriteByFile = (id: number) => {
    return this.http.get(this.url + '/favourites/file/' + id)
      .map(
        res =>
          res.json()
      );
  };

  createFavorite = (id: any) => {
    this.token = this.auth.getUserInfo().token;
    return this.http.post(this.url + '/favourites?token=' + this.token, id)
      .map(
        res => {
          res.json();
        });
  };

  deleteFavorite = (id: any) => {
    this.token = this.auth.getUserInfo().token;
    return this.http.delete(this.url + '/favourites/file/' + id + '?token=' + this.token)
      .map(
        res => {
          res.json();
        });
  }
}
