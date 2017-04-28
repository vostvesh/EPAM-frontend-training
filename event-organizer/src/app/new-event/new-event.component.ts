import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SocialEventLocation } from '../_models/social-event/social-event-location';
import { SocialEventDate } from '../_models/social-event/social-event-date';
import { SocialEventInfo } from '../_models/social-event/social-event-info';
import { SocialEventMembers } from '../_models/social-event/social-event-members';
import { SocialEvent } from '../_models/social-event/social-event';

import { SocialEventService } from '../_services/social-event.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  private _userName: string;

  private _socialEvent: SocialEvent;
  private _socialEventLocation: SocialEventLocation;
  private _socialEventDateStart: SocialEventDate;
  private _socialEventDateEnd: SocialEventDate;
  private _socialEventInfo: SocialEventInfo;
  private _socialEventMembers: SocialEventMembers;

  public userName: string;
  public category: string;
  public eventName: string;
  public description: string;
  public country: string;
  public city: string;
  public startDate: string;
  public endDate: string;
  public startHours: string;
  public endHours: string;
  public startMinutes: string;
  public endMinutes: string;
  public numberOfMembers: string;
  public minAge: string;
  public maxAge: string;
  public gender: string;

  /**maps */
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(private SocialEventService: SocialEventService, 
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this._userName = this.authService.getUserName();

    this._socialEvent = new SocialEvent(this._userName);
  }

  public setMinutes(e): void {
    if (+e.target.value < 0) {
      e.target.value = 0;
    }
    if (+e.target.value > 59) {
      e.target.value = 59;
    }
  }

  public setHours(e): void {
    if (+e.target.value < 0) {
      e.target.value = 0;
    }
    if (+e.target.value > 23) {
      e.target.value = 23;
    }
  }

  public setAge(e): void {
    if (+e.target.value < 0) {
      e.target.value = 0;
    }
    if (+e.target.value > 120) {
      e.target.value = 120;
    }
  }

  public setStartHours(e): void {
    this.setHours(e);
    this.startHours = e.target.value;
  }

  public setStartMinutes(e): void {
    this.setMinutes(e);
    this.startMinutes = e.target.value;
  }

  public setEndHours(e): void {
    this.setHours(e);
    this.endHours = e.target.value;
  }

  public setEndMinutes(e): void {
    this.setMinutes(e);
    this.endMinutes = e.target.value;
  }

  public setMinAge(e): void {
    this.setAge(e);
    this.minAge = e.target.value;
  }

  public setMaxAge(e): void {
    this.setAge(e);
    this.maxAge = e.target.value;
  }

  public setSocialEvent() {
    let startDate = new Date(this.startDate);
    startDate.setHours(+this.startHours);
    startDate.setMinutes(+this.startMinutes);
    let endDate = new Date(this.startDate);
    endDate.setHours(+this.endHours);
    endDate.setMinutes(+this.endMinutes);

    this._socialEventDateStart = new SocialEventDate(startDate);
    this._socialEventDateEnd = new SocialEventDate(endDate);
    this._socialEventInfo = new SocialEventInfo(this.category, this.eventName, this.description);
    this._socialEventLocation = new SocialEventLocation(this.country, this.city);
    this._socialEventMembers = new SocialEventMembers(+this.numberOfMembers, +this.minAge, +this.maxAge, this.gender);

    this._socialEvent.dateStart = this._socialEventDateStart;
    this._socialEvent.dateEnd = this._socialEventDateEnd;
    this._socialEvent.info = this._socialEventInfo;
    this._socialEvent.location = this._socialEventLocation;
    this._socialEvent.members = this._socialEventMembers;

    this.SocialEventService.storeUserEvent(this._userName, this._socialEvent);
    this.router.navigate(['user-dashboard/events-calendar']);
  }

}
