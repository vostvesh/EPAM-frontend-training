import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-alert',
  templateUrl: './form-alert.component.html',
  styleUrls: ['./form-alert.component.css']
})
export class FormAlertComponent implements OnInit {

  @Input() message: string;

  @Output() onFormAlert = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public onClickOK(): void {
    this.onFormAlert.emit(false);
  }

}
