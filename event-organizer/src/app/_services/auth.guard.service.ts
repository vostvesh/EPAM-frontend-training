import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url = state.url;

    return this.checkLogin(url);
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  public checkLogin(url: string): boolean {
    if (this._authService.isLoggedIn) {
      return true;
    }

    this._authService.redirectUrl = url;

    this._router.navigate(['login']);
    return false;
  }
}