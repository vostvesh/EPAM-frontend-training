export class SocialEvent {
  private _author: string;
  private _name: string;
  private _category: string;
  private _description: string;
  private _dateStart: Date;
  private _dateEnd: Date;
  private _membersNumber: number;
  private _membersGender: string;
  private _membersMinAge: number;
  private _membersMaxAge: number;
  private _locationLatitude: number;
  private _locationLongitude: number;
  private _locationAddress: any[];

  public static toJson(socialEvent: SocialEvent): any {
    return {
      author: socialEvent.author,
      name: socialEvent.name,
      category: socialEvent.category,
      description: socialEvent.description,
      dateStart: socialEvent.dateStart,
      dateEnd: socialEvent.dateEnd,
      membersNumber: socialEvent.membersNumber,
      membersGender: socialEvent.membersGender,
      membersMinAge: socialEvent.membersMinAge,
      membersMaxAge: socialEvent.membersMaxAge,
      locationLatitude: socialEvent.locationLatitude,
      locationLongitude: socialEvent.locationLongitude,
      locationAddress: socialEvent.locationAddress
    };
  }

  public static fromJson(json: any): SocialEvent {
    return new SocialEvent(json.author, json.name, json.category,
                           json.description, new Date(json.dateStart), new Date(json.dateEnd),
                           json.membersNumber, json.membersGender, json.membersMinAge,
                           json.membersMaxAge, json.locationLatitude, json.locationLongitude, json.locationAddress
    );
  }

  constructor(author: string, name: string,
              category: string, description: string,
              dateStart: Date, dateEnd: Date,
              membersNumber: number, membersGender: string,
              membersMinAge: number, membersMaxAge: number,
              latitude: number, longitude: number, address: any[]
  ) {
    if (this.isAuthor(author)) {
      this._author = author;
    }

    if (this.isName(name)) {
      this._name = name;
    }

    if (this.isCategory(category)) {
      this._category = category;
    }

    if (this.isDate(dateStart)) {
      this._dateStart = dateStart;
    }

    if (this.isDate(dateEnd) && this.isEndDate(dateEnd)) {
      this._dateEnd = dateEnd;
    }

    if (this.isMembersNumber(membersNumber)) {
      this._membersNumber = membersNumber;
    }

    if (this.isMembersGender(membersGender)) {
      this._membersGender = membersGender;
    }

    if (this.isAge(membersMinAge)) {
      this._membersMinAge = membersMinAge;
    }

    if (this.isAge(membersMaxAge) && this.isMaxAge(membersMaxAge)) {
      this._membersMaxAge = membersMaxAge;
    }

    if (this.isLatitude(latitude)) {
      this._locationLatitude = latitude;
    }

    if (this.isLongitude(longitude)) {
      this._locationLongitude = longitude;
    }

    this._locationAddress = address;
  }

  private isAuthor(author: string): boolean {
    if (!author) {
      throw new Error(`Incorrect {author}: ${author}`);
    }
    return true;
  }

  private isName(name: string): boolean {
    if (!name) {
      throw new Error(`Incorrect {name}: ${name}`);
    }
    return true;
  }

  private isCategory(category: string): boolean {
    if (!category) {
      throw new Error(`Incorrect {category}: ${category}`);
    }
    return true;
  }

  private isDate(date: Date): boolean {
    if (!date && !(date instanceof Date)) {
      throw new Error(`Incorrect {date}: ${date}`);
    }
    return true;
  }

  private isEndDate(date: Date): boolean {
    if (date <= this._dateStart) {
      throw new Error(`{endDate}: ${date} must be above {startDate}: ${this._dateStart}`);
    }
    return true;
  }

  private isMembersNumber(membersNumber: number): boolean {
    if (membersNumber < 0) {
      throw new Error(`Number of members must be above or equals 0. {membersNumber}: ${membersNumber}`);
    }
    return true;
  }

  private isMembersGender(gender: string): boolean {
    if (!gender) {
      throw new Error(`Incorrect {gender}: ${gender}`);
    }
    return true;
  }

  private isAge(age: number): boolean {
    if (age <= 0) {
      throw new Error(`{age} must be above 0`);
    } else if (age > 120) {
      throw new Error(`{age} must be below 120`);
    }
    return true;
  }

  private isMaxAge(age: number): boolean {
    if (age <= this._membersMinAge) {
      throw new Error(`{maxAge} must be larger then {minAge}`);
    }
    return true;
  }

  private isLatitude(latitude: number): boolean {
    if (!latitude) {
      throw new Error(`Incorrect {latitude}: ${latitude}`);
    }
    if (latitude < -90 || latitude > 90) {
      throw new Error(`{latitude}: ${latitude} must be above -90 or below 90`);
    }
    return true;
  }

  private isLongitude(longitude: number): boolean {
    if (!longitude) {
      throw new Error(`Incorrect {longitude}: ${longitude}`);
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error(`{longitude}: ${longitude} must be above -180 or below 180`);
    }
    return true;
  }

  public get author(): string {
    return this._author;
  }

  public get name(): string {
    return this._name;
  }

  public get category(): string {
    return this._category;
  }

  public get description(): string {
    return this._description;
  }

  public get dateStart(): Date {
    return this._dateStart;
  }

  public get dateEnd(): Date {
    return this._dateEnd;
  }

  public get membersNumber(): number {
    return this._membersNumber;
  }

  public get membersGender(): string {
    return this._membersGender;
  }

  public get membersMinAge(): number {
    return this._membersMinAge;
  }

  public get membersMaxAge(): number {
    return this._membersMaxAge;
  }

  public get locationLatitude(): number {
    return this._locationLatitude;
  }

  public get locationLongitude(): number {
    return this._locationLongitude;
  }

  public get locationAddress(): any[] {
    return this._locationAddress;
  }

}
