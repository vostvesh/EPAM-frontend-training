import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import { User } from '../_models/user';

@Injectable()
export class AuthService {
  private _KEY = 'AuthService-UserProfile';
  private _user: User = null;
  private _password: string;

  public isLoggedIn: boolean = false;
  public redirectUrl: string;

  private fetchUserFromStore() {
    let storedData = JSON.parse(localStorage.getItem(this._KEY));

    if (storedData) {
      let user = User.fromJson(storedData);
      this._user = new User(user.userName, user.firstName, user.lastName, user.gender, user.birthday);
      this._password = storedData.password;
    } else {
      this._user = null;
    }
  }

  private isUser(userName: string, password: string): boolean {
    if (this._user !== null) {
      if (this._user.userName === userName && this._password === password) {
        return true;
      }
    }
    return false;
  }

  public putUserToStore(user: User, password: string): void {
    let data = User.toJson(user);
    data.password = password;
    localStorage.setItem(this._KEY, JSON.stringify(data));
  }

  public login(userName: string, password: string): Observable<boolean> {
    this.fetchUserFromStore();
    let isUser = this.isUser(userName, password);
    return Observable.of(isUser).do(val => this.isLoggedIn = isUser);
  }

  public getUser(): User {
    return this._user;
  }

  public getUserName(): string {
    return this._user.userName;
  }

  public logout(): void {
    this.isLoggedIn = false;
  }

}