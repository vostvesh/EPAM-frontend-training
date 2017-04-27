import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isUser: boolean = false;

  constructor(private _authServis: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.isUser = this._authServis.isLoggedIn;
    if (this.isUser) {
      this._router.navigate(['user-dashboard']);
    }
  }
}
