import { Component, OnInit } from '@angular/core';

import { Calendar } from '../models/calendar';

import { SocialEventsService } from '../social-events.service';

import { SocialEvent } from '../models/social-event/social-event';
import { CalendarEvents } from '../models/calendar-events';

@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.css']
})
export class EventsCalendarComponent implements OnInit {
  private _calendar: Calendar = new Calendar();

  public days: Array<Array<number>>;
  public userEvents: SocialEvent[];
  public calendarEvents: CalendarEvents;

  public userEventsCounter: number = 0;

  constructor(private socialEventsService: SocialEventsService) {}

  ngOnInit() {
    this.days = this._calendar.getCalendarDays();
    this.userEvents = this.socialEventsService.getUserEvents('vasya');
    this.calendarEvents = new CalendarEvents(this.userEvents);
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

  public getUserEvents(day): number {
    let date = new Date(this._calendar.getYear(), this._calendar.getMonth(), day);
    return this.calendarEvents.getEventsCalendarByDay(date).length || 0;
  }

}
