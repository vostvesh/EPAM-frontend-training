import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { SocialEventService } from '../_services/social-event.service';
import { CalendarEventsSorter } from '../_models/calendar-events-sorter';
import { SocialEvent } from '../_models/social-event/social-event';

@Component({
  selector: 'app-user-events-list',
  templateUrl: './user-events-list.component.html',
  styleUrls: ['./user-events-list.component.css']
})
export class UserEventsListComponent implements OnInit {
  private _userName = 'vasya';

  public date: Date;
  public calendarEventSorter: CalendarEventsSorter;
  public userEvents: SocialEvent[];

  constructor(private activatedRoute: ActivatedRoute, 
              private router: Router,
              private SocialEventService: SocialEventService) { }


  ngOnInit() {
    this.SocialEventService = new SocialEventService();
    this.userEvents = this.SocialEventService.getUserEvents(this._userName);
    this.calendarEventSorter = new CalendarEventsSorter(this.userEvents);

    this.activatedRoute.params.subscribe(params => {
      let date = new Date(params['date']);
      this.userEvents = this.calendarEventSorter.sortEventsByDay(date);
    });
  }

}
