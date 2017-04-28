import { Injectable } from '@angular/core';

import { SocialEvent } from '../_models/social-event/social-event';

@Injectable()
export class SocialEventService {
  private KEY = 'SocialEventService-EventsList';

  public allEvents: SocialEvent[] = [];
  public userEvents: SocialEvent[] = [];

  constructor() {
    this.getAllEventsFromStore();
  }

  private getAllEventsFromStore(): void {
    // let allEvents: SocialEvent[] = [];
    let ls = JSON.parse(localStorage.getItem(this.KEY));

    if (ls !== null) {
      for (let event of ls) {
        this.allEvents.push(SocialEvent.fromJson(event));
      }
    }

    // return allEvents;
  }

  // public updateAllEventsList(): void {
  //   this.allEvents = this.getAllEventsFromStore();
  // }

  public geAllEvents(): SocialEvent[] {
    return this.allEvents;
  }

  public getUserEvents(userName: string): SocialEvent[] {
    let userEvents: SocialEvent[] = [];

    for (let event of this.allEvents) {
      if (event.userName === userName) {
        userEvents.push(event);
      }
    }
    // let ls = JSON.parse(localStorage.getItem(this.KEY));

    // if (ls !== null && ls[userName]) {
    //   let userDataStorage = ls[userName];
    //   for (let event of userDataStorage) {
    //     userEvents.push(SocialEvent.fromJson(event));
    //   }
    // }

    return userEvents;
  }

  public storeUserEvent(userName: string, socialEvent: SocialEvent): void {
    this.allEvents.push(socialEvent);
    let data = this.allEvents.map(event => SocialEvent.toJson(event));

    // let data = {[userName]: userEvents.map(event => SocialEvent.toJson(event))};
    localStorage.setItem(this.KEY, JSON.stringify(data));
  }

}
