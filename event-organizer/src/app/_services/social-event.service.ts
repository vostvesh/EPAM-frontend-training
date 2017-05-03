import { Injectable } from '@angular/core';

import { SocialEvent } from '../_models/social-event';

@Injectable()
export class SocialEventService {
  private KEY = 'SocialEventService-EventsList';

  public allEvents: SocialEvent[] = [];
  public userEvents: SocialEvent[] = [];

  constructor() {
    this.getAllEventsFromStore();
  }

  private getAllEventsFromStore(): void {
    let ls = JSON.parse(localStorage.getItem(this.KEY));

    if (ls !== null) {
      for (let event of ls) {
        this.allEvents.push(SocialEvent.fromJson(event));
      }
    }

  }

  public geAllEvents(): SocialEvent[] {
    return this.allEvents;
  }

  public getUserEvents(userName: string): SocialEvent[] {
    let userEvents: SocialEvent[] = [];

    for (let event of this.allEvents) {
      if (event.author === userName) {
        userEvents.push(event);
      }
    }

    return userEvents;
  }

  public storeUserEvent(userName: string, socialEvent: SocialEvent): void {
    this.allEvents.push(socialEvent);
    let data = this.allEvents.map(event => SocialEvent.toJson(event));

    localStorage.setItem(this.KEY, JSON.stringify(data));
  }

}
