import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';

import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private _user: User;

  public userName: string;
  public firstName: string;
  public lastName: string;
  public passowrd: string;
  public confirmPass: string;
  public dateOfBirth: string;
  public gender: string;
  public saveData: string;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  public onRegister(): void {
    console.log(this.userName, this.firstName, this.lastName, this.gender, this.passowrd, this.dateOfBirth);
    let date = new Date(this.dateOfBirth);
    if (this.passowrd === this.confirmPass) {
      this._user = new User(this.userName, this.firstName, this.lastName, this.gender, date);
    }
    if (this.saveData) {
      this._authService.putUserToStore(this._user, this.passowrd);
    }
    this._router.navigate(['login']);
  }

}
