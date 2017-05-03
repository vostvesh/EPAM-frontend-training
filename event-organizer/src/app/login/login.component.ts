import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isAlert: boolean = false;
  public alertMessage: string = 'Login or password is incorrect!';

  constructor(private _authServis: AuthService, private _router: Router) { }

  ngOnInit() {

  }

  public login(userName: string, password: string) {
    this._authServis.login(userName, password).subscribe(() => {
      if (this._authServis.isLoggedIn) {
        this._router.navigate(['']);
        this.isAlert = false;
      } else {
        this.isAlert = true;
      }
    });
  }

  public logout(): void {
    this._authServis.logout();
  }

  public register(): void {
    this._router.navigate(['register']);
  }

  public onResetValue(input: any): void {
    input.value = '';
  }

  public onFormAlert(event): void {
    this.isAlert = event;
  }

}
