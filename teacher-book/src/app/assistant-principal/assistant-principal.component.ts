import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assistant-principal',
  templateUrl: './assistant-principal.component.html',
  styleUrls: ['./assistant-principal.component.css']
})
export class AssistantPrincipalComponent implements OnInit {
  private _teacherName: string;

  public teacherName: string;

  constructor() { }

  public setTeacherName(): void {
    this._teacherName = this.teacherName;
  }

  public getTeacherName(): string {
    return this._teacherName;
  }

  public renderTeacherBook(): void {
    this.setTeacherName();
  }

  public isTeacherName(): boolean {
    return this._teacherName ? true : false;
  }

  public isInputEmpty(): boolean {
    return this.teacherName !== '';
  }

  ngOnInit() {
  }

}
