import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _isUser: boolean = true;
  public isUser: boolean;

  ngOnInit(): void {
    this.isUser = this._isUser;
  }
}
