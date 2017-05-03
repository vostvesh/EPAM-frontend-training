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

  public alertMessage: string = 'Please input all fields correctly!';
  public isAlert: boolean = false;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  public isUserName(): boolean {
    if (this.userName) {
      if (this.userName.match(/^[a-zA-Z0-9][a-zA-Z0-9_]{7,14}$/)) {
        return true;
      }
    }
    return false;
  }

  public isPassword(): boolean {
    if (this.passowrd) {
      if (this.passowrd.match(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{7,40})$/)) {
        return true;
      }
    }
    return false;
  }

  public isConfirmPassword(): boolean {
    if (this.passowrd === this.confirmPass) {
      return true;
    }
    return false;
  }

  public isFirstName(): boolean {
    if (this.firstName) {
      return true;
    }
    return false;
  }

  public isLastName(): boolean {
    if (this.lastName) {
      return true;
    }
    return false;
  }

  public isISODate(): boolean {
    if (this.dateOfBirth) {
      if (this.dateOfBirth.match(/^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])(\D?([01]\d|2[0-3])\D?([0-5]\d)\D?([0-5]\d)?)?$/)) {
        return true;
      }
    }
    return false;
  }

  public isFormCorrect(form: HTMLFormElement): boolean {
    let elements = form.getElementsByClassName('alert');
    if (elements.length) {
      return false;
    }
    return true;
  }

  public onFormAlert(event): void {
    this.isAlert = event;
  }

  public onRegister(form): void {
    if (this.isFormCorrect(form)) {
      this.isAlert = false;

      if (this.saveData) {
        let date = new Date(this.dateOfBirth);
        this._user = new User(this.userName, this.firstName, this.lastName, this.gender, date);
        this._authService.putUserToStore(this._user, this.passowrd);
      }

      this._router.navigate(['login']);
    } else {
      this.isAlert = true;
    }
  }

}
