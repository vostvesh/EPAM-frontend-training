import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Calendar } from '../_models/calendar';
import { User } from '../_models/user';

import { SocialEventService } from '../_services/social-event.service';
import { AuthService } from '../_services/auth.service';

import { SocialEvent } from '../_models/social-event';
import { CalendarEventsSorter } from '../_models/calendar-events-sorter';

@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.css']
})
export class EventsCalendarComponent implements OnInit {
  private _calendar: Calendar = new Calendar();
  private _userName: string;

  public days: Array<Array<number>>;
  public date: Date = new Date();
  public calendarDate: Date = new Date();

  public userEvents: SocialEvent[] = [];
  public allEvents: SocialEvent[] = [];

  public calendarUserEventsSorter: CalendarEventsSorter;
  public calendarAllEventsSorter: CalendarEventsSorter;
  public userCalendarEvents: SocialEvent[] = [];
  public allCalendarEvents: SocialEvent[] = [];

  constructor(private SocialEventService: SocialEventService,
              private router: Router,
              private authServise: AuthService) {}

  ngOnInit() {
    this.days = this._calendar.getCalendarDays();

    this._userName = this.authServise.getUserName();

    this.userEvents = this.SocialEventService.getUserEvents(this._userName);
    this.allEvents = this.SocialEventService.allEvents;

    this.calendarUserEventsSorter = new CalendarEventsSorter(this.userEvents);
    this.calendarAllEventsSorter = new CalendarEventsSorter(this.allEvents);
  }

  public isUserEventDay(date: Date): boolean {
    this.setUserCalendarEvents(date);
    return this.userCalendarEvents.length > 0 ? true : false;
  }

  public isAllEventDay(date: Date): boolean {
    this.setAllCalendarEvents(date);
    return this.allCalendarEvents.length > 0 ? true : false;
  }

  public isWeekend(i): boolean {
    if ((i / 5) === 1 || (i / 6) === 1) {
      return true;
    }
    return false;
  }

  public isAnotherMonth(day: Date): boolean {
    if (day.getMonth() === this._calendar.getMonth()) {
      return false;
    }
    return true;
  }

  public isPreviousDays(day: Date): boolean {
    let currentDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
    let date = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    if (date < currentDate) {
      return true;
    }
    return false;
  }

  public setUserCalendarEvents(date: Date): void {
    this.userCalendarEvents = this.calendarUserEventsSorter.sortEventsByStartDay(date);
  }

  public setAllCalendarEvents(date: Date): void {
    this.allCalendarEvents = this.calendarAllEventsSorter.sortEventsByStartDay(date);
  }

  public getDayNames(): Array<string> {
    return this._calendar.getCalendarWeekDaysNames();
  }

  public updateCalendarDays(): void {
    this.days = this._calendar.getCalendarDays();
    this.calendarDate = this._calendar.getDate();
  }

  public prevMonth(): void {
    this._calendar.setMonth(this._calendar.getMonth(), -1);
    if ((this._calendar.getYear() === this.date.getFullYear()) && (this._calendar.getMonth() === this.date.getMonth())) {
      this._calendar.setDay(this.date.getDate());
    }
    this.updateCalendarDays();
  }

  public nextMonth(): void {
    this._calendar.setMonth(this._calendar.getMonth(), 1);
    if ((this._calendar.getYear() === this.date.getFullYear()) && (this._calendar.getMonth() === this.date.getMonth())) {
      this._calendar.setDay(this.date.getDate());
    }
    this.updateCalendarDays();
  }

  public onUserEventsList(date: Date): void {
    // this.setUserCalendarEvents(date);
    this.router.navigate(['user-dashboard/user-events-list', date.toDateString()]);
  }

  public onAllEventsList(date: Date): void {
    // this.setUserCalendarEvents(date);
    this.router.navigate(['user-dashboard/all-events-list', date.toDateString()]);
  }

}
