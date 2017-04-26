export class SocialEventDate {
  private _date: Date;
  private _year: number;
  private _month: number;
  private _day: number;
  private _hours: number;
  private _minutes: number;

  private initParams(): void {
    this._year = this._date.getFullYear();
    this._month = this._date.getMonth();
    this._day = this._date.getDate();
    this._hours = this._date.getHours();
    this._minutes = this._date.getMinutes();
  }

  constructor (date: Date) {
    if (date && date instanceof Date) {
      this._date = date;
    } else {
      throw new Error(`{date} is not instanse of Date.`);
    }

    this.initParams();
  }

  public get date(): Date {
    return this._date;
  }

  public get year(): number {
    return this._year;
  }

  public get month(): number {
    return this._month;
  }

  public get day(): number {
    return this._day;
  }

  public get hours(): number {
    return this._hours;
  }

  public get minutes(): number {
    return this._minutes;
  }
}
