import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    if (!this._authService.isLoggedIn) {
      this._router.navigate(['login']);
    }
  }

}
