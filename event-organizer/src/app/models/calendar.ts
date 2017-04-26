interface ICalendarOptions {
  startDay?: number;
  language?: string;
  numberOfLettersInDayName?: number;
}

export class Calendar {
  private _date: Date;
  private _options: ICalendarOptions = {
    language: 'en-us',
    startDay: 1,
    numberOfLettersInDayName: 3
  };

  constructor() {
    this._date = new Date();
  }

  private _isDay(day: number): boolean {
    let month = this.getMonth();
    let year = this.getYear();
    return !!day && day > 0 && new Date(year, month, day).getMonth() === month;
  }

  // private _isMonth(month: number): boolean {
  //   return !!month && month >= 0 && month < 12;
  // }

  private _isYear(year: number): boolean {
    return !!year && ('' + year).length === 4;
  }

  private _setCurrentTime(): void {
    this._date.setSeconds(this.getCurrentSeconds());
    this._date.setMinutes(this.getCurrentMinutes());
    this._date.setHours(this.getCurrentHours());
  }

  public setDay(day: number): void {
    if (!this._isDay(day)) {
      throw new Error(`Incorrect {day}: ${day}`);
    }
    this._date = new Date(this.getYear(), this.getMonth(), day);
    this._setCurrentTime();
  }

  public setMonth(month: number, count?: number): void {
    // if (!this._isMonth(month)) {
    //   throw new Error(`Incorrect {month}: ${month}`);
    // }
    if (count && +count) {
      month += count;
    }
    this._date = new Date(this.getYear(), month, this.getDay());
    this._setCurrentTime();
  }

  public setYear(year: number, count?: number): void {
    if (!this._isYear(year)) {
      throw new Error(`Incorrect {year}: ${year}`);
    }
    if (count && +count) {
      year += count;
    }
    this._date = new Date(year, this.getMonth(), this.getDay());
    this._setCurrentTime();
  }

  public setDate(day: number, month: number, year: number): void {
    this.setDay(day);
    this.setMonth(month);
    this.setYear(year);
    this._setCurrentTime();
  }

  public getDate(): Date {
    return this._date;
  }

  public getCurrentHours(): number {
    return new Date().getHours();
  }

  public getCurrentMinutes(): number {
    return new Date().getMinutes();
  }

  public getCurrentSeconds(): number {
    return new Date().getSeconds();
  }

  public getCurrentTime(): string {
    let hours = this.getCurrentHours();
    let minutes = this.getCurrentMinutes();
    let seconds = this.getCurrentSeconds();

    return `${hours}:${('0' + minutes).slice(-2)} ${hours <= 12 ? 'AM' : 'PM'}`;
  }

  public getDay(): number {
    return this._date.getDate();
  }

  public getWeekday(): number {
    return this._date.getDay();
  }

  public getMonth(): number {
    return this._date.getMonth();
  }

  public getYear(): number {
    return this._date.getFullYear();
  }

  public getMonthAsString(): string {
    return this._date.toLocaleString(this._options.language, {month: 'long'}).toUpperCase();
  }

  public getWeekdayAsString(): string {
    return this._date.toLocaleString(this._options.language, {weekday: 'long'})
                     .toUpperCase()
                     .slice(0, this._options.numberOfLettersInDayName);
  }

  public getDaysInCurrentMonth(): number {
    return new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0).getDate();
  }

  public getDaysInPreviousMonth(): number {
    return new Date(this._date.getFullYear(), this._date.getMonth(), 0).getDate();
  }

  public getFirstDayInMonth(): number {
    return new Date(this._date.getFullYear(), this._date.getMonth(), 1).getDay();
  }

  public getCalendarDays(): Array<Array<number>> {
    let calendar = [];
    const NUMBER_OF_WEEKS = 6;
    const NUMBER_OF_DAYS = NUMBER_OF_WEEKS * 7;
    let daysInCurrentMonth = this.getDaysInCurrentMonth();
    let prevMonthDay = this.getDaysInPreviousMonth();
    let nextMonthDay = 1;
    let currenMonthDay = 1;
    let firstDayInMonth = this.getFirstDayInMonth() - this._options.startDay;

    if (firstDayInMonth < 0 ) {
      firstDayInMonth += firstDayInMonth + 7 + this._options.startDay;
    }

    for (let i = 0, j = -1; i < NUMBER_OF_DAYS; i++) {
      if (i % 7 === 0) {
        j++;
        calendar[j] = [];
      }

      if (i < firstDayInMonth) {
        calendar[j].unshift(prevMonthDay--);
      } else if (i < daysInCurrentMonth + firstDayInMonth) {
        calendar[j].push(currenMonthDay++);
      } else {
        calendar[j].push(nextMonthDay++);
      }
    }

    return calendar;
  }

  public getCalendarWeekDaysNames(): Array<string> {
    let weekdaysNames = [];
    let startDay = this._options.startDay;
    for (let i = 1; i <= 7; i++) {
      let name = new Date(2017, 9, startDay + i).toLocaleString(this._options.language, {weekday: 'long'});
      name = name.slice(0, this._options.numberOfLettersInDayName).toUpperCase();
      weekdaysNames.push(name);
    }
    return weekdaysNames;
  }

}
