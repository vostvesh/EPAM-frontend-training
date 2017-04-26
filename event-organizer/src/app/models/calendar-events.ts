import { Calendar } from './calendar';
import { SocialEvent } from './social-event/social-event';

export class CalendarEvents {
  private _socialEvents: SocialEvent[];

  constructor(socialEvents: SocialEvent[]) {
    this._socialEvents = socialEvents;
  }

  public getEventsCalendarByDay(date: Date): SocialEvent[] {
    let currentDay = date;

    let result = this._socialEvents.filter(event => {
      let searchDay = new Date(event.dateStart.year, event.dateStart.month, event.dateStart.day);
      return currentDay === searchDay;
    });

    return result;
  }

}