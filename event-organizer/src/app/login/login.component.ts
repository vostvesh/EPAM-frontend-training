import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _username: string;
  private _password: string;

  constructor() { }

  ngOnInit() {
  }

  public setLogin(username: string, password: string) {
    this._username = username;
    this._password = password;
  }

}
