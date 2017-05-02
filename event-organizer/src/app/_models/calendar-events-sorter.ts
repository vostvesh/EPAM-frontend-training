import { Calendar } from './calendar';
import { SocialEvent } from './social-event';

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
      let date = new Date(event.dateStart.getFullYear(), event.dateStart.getMonth(), event.dateStart.getDate());
      return searchedDay.toDateString() === date.toDateString();
    });

    return result;
  }


}