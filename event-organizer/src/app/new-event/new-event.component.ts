import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SocialEventLocation } from '../_models/social-event/social-event-location';
import { SocialEventDate } from '../_models/social-event/social-event-date';
import { SocialEventInfo } from '../_models/social-event/social-event-info';
import { SocialEventMembers } from '../_models/social-event/social-event-members';
import { SocialEvent } from '../_models/social-event';

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

  public eventCategory: string;
  public eventName: string;
  public eventDescription: string;
  public eventDateStart: Date;
  public eventDateEnd: Date;
  public eventMembersNumber: number;
  public eventMembersMinAge: number;
  public eventMembersMaxAge: number;
  public eventMembersGender: string;
  public eventLocationLatitude: number = 53.9168000;
  public eventLocationLongitude: number = 30.3449000;
  public eventLocationAddress: any[];

  public isCorrectDays: boolean = false;
  public isFormAlert: boolean = false;

  /**maps */
  // lat: number = 51.678418;
  // lng: number = 7.809007;

  constructor(private SocialEventService: SocialEventService, 
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this._userName = this.authService.getUserName();
  }

  public isEventCategory(): boolean {
    if (this.eventCategory) {
      if (this.eventCategory.length > 2 && this.eventCategory.length < 20) {
        return true;
      }
    }
    return false;
  }

  public isEventName(): boolean {
    if (this.eventName) {
      if (this.eventName.length > 2 && this.eventName.length < 20) {
        return true;
      }
    }
    return false;
  }

  public isEventDescription(): boolean {
    if (this.eventDescription) {
      if (this.eventDescription.length > 5 && this.eventDescription.length < 100) {
        return true;
      }
    }
    return false;
  }

  public isEventDateCorrect(): boolean {
    if (this.eventDateStart && this.eventDateEnd) {
      if (this.eventDateEnd > this.eventDateStart) {
        return true;
      }
    }
    return false;
  }

  public isEventMembersNumber(): boolean {
    if (+this.eventMembersNumber) {
      if (+this.eventMembersNumber < 100000000) {
        return true;
      }
    }
    return false;
  }

  public isCorrectAges(): boolean {
    if (this.eventMembersMaxAge && this.eventMembersMinAge) {
      if (+this.eventMembersMaxAge >= +this.eventMembersMinAge) {
        return true;
      }
    }
    return false;
  }

  public isGender(): boolean {
    if (this.eventMembersGender) {
      return true;
    }
    return false;
  }

  public isFormCorrect(form: HTMLFormElement): boolean {
    let elements = form.getElementsByClassName('form-alert');
    if (!this.isCorrectDays && elements || elements.length) {
      return false;
    }
    return true;
  }

  public setAge(e): void {
    if (+e.target.value < 0) {
      e.target.value = 0;
    }
    if (+e.target.value > 120) {
      e.target.value = 120;
    }
  }

  public setMinAge(e): void {
    this.setAge(e);
    this.eventMembersMinAge = e.target.value;
  }

  public setMaxAge(e): void {
    this.setAge(e);
    this.eventMembersMaxAge = e.target.value;
  }

  public onLocationPick(event: any): void {
    this.eventLocationLatitude = event.latitude;
    this.eventLocationLongitude = event.longitude;
    this.eventLocationAddress = event.address;
  }

  public onSDatePickerChanged(date): void {
    this.eventDateStart = date;
    if (!this.isEventDateCorrect()) {
      this.isCorrectDays = false;
    } else {
      this.isCorrectDays = true;
    }
  }

  public onEDatePickerChanged(date): void {
    this.eventDateEnd = date;
    if (!this.isEventDateCorrect()) {
      this.isCorrectDays = false;
    } else {
      this.isCorrectDays = true;
    }
  }

  public onSubmitSocialEvent(formData: HTMLFormElement): void {
    if (this.isFormCorrect(formData)) {
      this.isFormAlert = false;

      this._socialEvent = new SocialEvent(
          this._userName, this.eventName, this.eventCategory, 
          this.eventDescription, this.eventDateStart, this.eventDateEnd, 
          this.eventMembersNumber, this.eventMembersGender, this.eventMembersMinAge, 
          this.eventMembersMaxAge, this.eventLocationLatitude, this.eventLocationLongitude, this.eventLocationAddress
      );

      this.SocialEventService.storeUserEvent(this._userName, this._socialEvent);
      this.router.navigate(['user-dashboard/events-calendar']);
    } else {
      this.isFormAlert = true;
    }
  }

  public onCancelSocialEvent(): void {
    this.router.navigate(['user-dashboard/events-calendar']);
  }

}
