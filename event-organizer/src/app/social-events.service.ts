import { Injectable } from '@angular/core';

import { SocialEvent } from './models/social-event/social-event';

@Injectable()
export class SocialEventsService {
  private KEY = 'eventsList';

  public getUserEvents(userName: string): SocialEvent[] {
    let userEvents: SocialEvent[] = [];
    let ls = JSON.parse(localStorage.getItem(this.KEY));

    if (ls !== null && ls[userName] !== null) {
      let userDataStorage = ls[userName] || [];
      for (let event of userDataStorage) {
        userEvents.push(SocialEvent.fromJson(event));
      }
    }

    return userEvents;
  }

  public storeUserEvent(userName: string, socialEvent: SocialEvent): void {
    let userEvents = this.getUserEvents(userName) || [];
    userEvents.push(socialEvent);

    let data = {[userName]: userEvents.map(event => SocialEvent.toJson(event))};
    localStorage.setItem(this.KEY, JSON.stringify(data));
  }

}
