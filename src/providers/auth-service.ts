import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  logged: Boolean = false;

  private url: string = 'http://media.mw.metropolia.fi/wbma';

  private user: any = {};

  constructor(public http: Http) {
    console.log('Hi there!');
  }

  setUser = (user) => {
    this.user = user;
  };

  getUserInfo = () => {
    return this.user;
  };

  removeUser = () => {
    this.user = {};
  };

  login = () => {
    return this.http.post(this.url + '/login', this.user)
      .map(
        res =>
          res.json()
      );
  };

  register = () => {
    return this.http.post(this.url + '/users', this.user)
      .map(
        res =>
          res.json()
      );
  }
}
