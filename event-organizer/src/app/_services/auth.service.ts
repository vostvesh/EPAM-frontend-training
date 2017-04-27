import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { User } from '../_models/user';

@Injectable()
export class AuthService {
  private _user: User;

  public isLoggedIn: boolean = false;
  public redirectUrl: string;

  public login(): Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  public logout(): void {
    this.isLoggedIn = false;
  }

}