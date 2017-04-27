import { Calendar } from './calendar';
import { SocialEvent } from './social-event/social-event';

export class CalendarEventsSorter {
  private _socialEvents: SocialEvent[];

  constructor(socialEvents: SocialEvent[]) {
    this._socialEvents = socialEvents;
  }

  public sortEventsByDay(date: Date): SocialEvent[] {
    let result: SocialEvent[] = [];
    let events = this._socialEvents;
    let searchedDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    result = events.filter(event => {
      let eventDate = event.dateStart;
      let eventDay = new Date(eventDate.year, eventDate.month, eventDate.day);
      return searchedDay.toDateString() === eventDay.toDateString();
    });

    return result;
  }


}