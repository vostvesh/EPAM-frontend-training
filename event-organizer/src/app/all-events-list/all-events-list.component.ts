import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { SocialEventService } from '../_services/social-event.service';
import { AuthService } from '../_services/auth.service';

import { CalendarEventsSorter } from '../_models/calendar-events-sorter';
import { SocialEvent } from '../_models/social-event';

@Component({
  selector: 'app-all-events-list',
  templateUrl: './all-events-list.component.html',
  styleUrls: ['./all-events-list.component.css']
})
export class AllEventsListComponent implements OnInit {

  private _userName: string;

  public date: Date;
  public calendarEventSorter: CalendarEventsSorter;
  public allEvents: SocialEvent[];

  constructor(private activatedRoute: ActivatedRoute, 
              private router: Router,
              private SocialEventService: SocialEventService,
              private authService: AuthService) { }


  ngOnInit() {
    this.SocialEventService = new SocialEventService();
    this._userName = this.authService.getUserName();
    this.allEvents = this.SocialEventService.allEvents;
    this.calendarEventSorter = new CalendarEventsSorter(this.allEvents);

    this.activatedRoute.params.subscribe(params => {
      let date = new Date(params['date']);
      this.allEvents = this.calendarEventSorter.sortEventsByDay(date);
      this.date = date;
    });
  }

}
