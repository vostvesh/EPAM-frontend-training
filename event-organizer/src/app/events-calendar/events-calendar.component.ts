import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Calendar } from '../_models/calendar';

import { SocialEventService } from '../_services/social-event.service';

import { SocialEvent } from '../_models/social-event/social-event';
import { CalendarEventsSorter } from '../_models/calendar-events-sorter';

@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.css']
})
export class EventsCalendarComponent implements OnInit {
  private _calendar: Calendar = new Calendar();

  public days: Array<Array<number>>;
  public userEvents: SocialEvent[] = [];

  public calendarEventsSorter: CalendarEventsSorter;
  public userCalendarEvents: SocialEvent[] = [];

  constructor(private SocialEventService: SocialEventService,
              private router: Router) {}

  ngOnInit() {
    this.days = this._calendar.getCalendarDays();

    this.userEvents = this.SocialEventService.getUserEvents('vasya');

    this.calendarEventsSorter = new CalendarEventsSorter(this.userEvents);
  }

  public isEventDay(date: Date): boolean {
    this.setUserCalendarEvents(date);
    return this.userCalendarEvents.length > 0 ? true : false;
  }

  public setUserCalendarEvents(date: Date): void {
    this.userCalendarEvents = this.calendarEventsSorter.sortEventsByDay(date);
  }

  public getDayNames(): Array<string> {
    return this._calendar.getCalendarWeekDaysNames();
  }

  public updateCalendarDays(): void {
    this.days = this._calendar.getCalendarDays();
  }

  public prevMonth(): void {
    this._calendar.setMonth(this._calendar.getMonth(), -1);
    this.updateCalendarDays();
  }

  public nextMonth(): void {
    this._calendar.setMonth(this._calendar.getMonth(), 1);
    this.updateCalendarDays();
  }

  public goToUserEventsList(date: Date): void {
    // this.setUserCalendarEvents(date);
    this.router.navigate(['user-dashboard/user-events-list', date.toDateString()]);
  }

}
