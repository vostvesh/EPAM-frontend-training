import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  public userName: string;

  constructor(private _authService: AuthService, private _roter: Router) { }

  ngOnInit() {
    let date = new Date();
    this._roter.navigate(['user-dashboard/user-events-list', date.toDateString()]);
    this.userName = this._authService.getUserName();
  }

  logout() {
    this._authService.logout();
    this._roter.navigate(['login']);
  }

}
