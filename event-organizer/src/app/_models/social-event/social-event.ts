import { SocialEventDate } from './social-event-date';
import { SocialEventInfo } from './social-event-info';
import { SocialEventLocation } from './social-event-location';
import { SocialEventMembers } from './social-event-members';

export class SocialEvent {
  private _userName: string;
  private _info: SocialEventInfo;
  private _location: SocialEventLocation;
  private _members: SocialEventMembers;
  private _dateStart: SocialEventDate;
  private _dateEnd: SocialEventDate;

  public static toJson(socialEvent: SocialEvent): any {
    return {
      userName: socialEvent._userName,
      eventName: socialEvent._info.eventName,
      category: socialEvent._info.category,
      description: socialEvent._info.description,
      country: socialEvent._location.country,
      city: socialEvent._location.city,
      latitude: socialEvent._location.latitude,
      longitude: socialEvent._location.longitude,
      dateStart: socialEvent._dateStart.date,
      dateEnd: socialEvent._dateEnd.date,
      numberOfMembers: socialEvent._members.numberOfMembers,
      gender: socialEvent._members.gender,
      minAge: socialEvent._members.minAge,
      maxAge: socialEvent._members.maxAge
    };
  }

  public static fromJson(json: any): SocialEvent {
    let se = new SocialEvent(json.userName);
    let info = new SocialEventInfo(json.category, json.eventName, json.description);
    let startDate = new SocialEventDate(new Date(json.dateStart));
    let endDate = new SocialEventDate(new Date(json.dateEnd));
    let location = new SocialEventLocation(json.country, json.city);
    let members = new SocialEventMembers(json.numberOfMembers, json.minAge, json.maxAge, json.gender);

    se._dateEnd = endDate;
    se._dateStart = startDate;
    se._info = info;
    se._location = location;
    se._members = members;
    return se;
  }

  constructor(userName: string) {
    if (!userName) {
      throw new Error(`Incorrect {uerName}: ${userName}`);
    } else {
      this._userName = userName;
    }
  }

  public get userName(): string {
    return this._userName;
  }

  public set info(info: SocialEventInfo) {
    this._info = info;
  }

  public get info(): SocialEventInfo {
    return this._info;
  }

  public set location(location: SocialEventLocation) {
    this._location = location;
  }

  public get location(): SocialEventLocation {
    return this._location;
  }

  public set members(members: SocialEventMembers) {
    this._members = members;
  }

  public get members(): SocialEventMembers {
    return this._members;
  }

  public get dateStart(): SocialEventDate {
    return this._dateStart;
  }

  public set dateStart(date: SocialEventDate) {
    this._dateStart = date;
  }

  public set dateEnd(date: SocialEventDate) {
    this._dateEnd = date;
  }

  public get dateEnd(): SocialEventDate {
    return this._dateEnd;
  }
}

