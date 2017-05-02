import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Calendar } from '../_models/calendar';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  public isVisible: boolean = false;
  public calendar: Calendar;

  public date: Date;
  public days: Array<Array<number>>;
  public hours: number = 12;
  public minutes: number = 30;

  @Input() isCorrectDays: boolean;

  @Output() onDatePickerChanged = new EventEmitter<Date>();

  constructor() { }

  ngOnInit() {
    this.calendar = new Calendar();
    this.days = this.calendar.getCalendarDays();
  }

  public isEventEndDate(): boolean {
    if (!this.isCorrectDays) {
      return false;
    }
    return true;
  }

  public getDayNames(): Array<string> {
    return this.calendar.getCalendarWeekDaysNames();
  }

  public updateCalendarDays(): void {
    this.days = this.calendar.getCalendarDays();
  }

  public onPrevMonth(): void {
    this.calendar.setMonth(this.calendar.getMonth(), -1);
    this.updateCalendarDays();
  }

  public onNextMonth(): void {
    this.calendar.setMonth(this.calendar.getMonth(), 1);
    this.updateCalendarDays();
  }

  public onDatePick(): void {
    this.isVisible = !this.isVisible;
  }

  public onClickDate(day: Date): void {
    let date = day.getDate();
    let month = day.getMonth();
    let year = day.getFullYear();
    this.date = new Date(year, month, date, +this.hours, +this.minutes);
    this.isVisible = false;
    this.onDatePickerChanged.emit(this.date);
  }

  public onKeydownDate(event: KeyboardEvent): void {
    event.preventDefault();
  }

}
