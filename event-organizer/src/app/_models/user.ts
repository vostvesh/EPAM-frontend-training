export class User {
  private _userName: string;
  private _firstName: string;
  private _lastName: string;
  private _gender: string;
  private _birthday: Date;
  private _age: number;

  public static toJson(user: User): any {
    return {
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: user.birthday,
      gender: user.gender,
      age: user.age
    };
  }

  public static fromJson(json: any): User {
    let birthday = new Date(json.birthday);
    return new User(json.userName, json.firstName, json.lastName, json.gender, birthday);
  }

  constructor(userName: string, firstName: string, lastName: string, gender: string, birthday: Date) {
    this._userName = this.isUserName(userName) ? userName : '';
    this._firstName = this.isCorrectName(firstName) ? firstName : '';
    this._lastName = this.isCorrectName(lastName) ? lastName : '';
    this._gender = this.isGender(gender) ? gender : '';
    this._birthday = this.isBirsthday(birthday) ? birthday : null;
    this.setAge(this._birthday);
  }

  private isUserName(userName: string): boolean {
    if (!userName || !userName.length) {
      throw new Error(`Incorrect {userName}: ${userName}`);
    }
    if (userName.length < 7) {
      throw new Error(`This {userName}: ${userName} length must be 7 or heigther`);
    }
    return true;
  }

  private isCorrectName(firstName): boolean {
    if (!firstName || !firstName.length) {
      throw new Error(`Incorrect {firstName}: ${firstName}`);
    }
    if (firstName.length < 2) {
      throw new Error(`This {firstName}: ${firstName} length must be 2 or heigther`);
    }
    return true;
  }

  private isBirsthday(birthday: Date): boolean {
    if (!birthday && !(birthday instanceof Date)) {
      throw new Error(`Incorrect {birthday}: ${birthday}`);
    }
    let age = new Date().getFullYear() - birthday.getFullYear();
    if (age > 120 || age < 0) {
      throw new Error(`The {age} ${age} must be below 120 or above 0`);
    }
    return true;
  }

  private isGender(gender: string): boolean {
    if (!gender) {
      throw new Error(`Incorrect {gender}: ${gender}`);
    }
    return true;
  }

  private setAge(birthday: Date): void {
    this._age = new Date().getFullYear() - birthday.getFullYear();
  }

  public get userName(): string {
    return this._userName;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get gender(): string {
    return this._gender;
  }

  public get birthday(): Date {
    return this._birthday;
  }

  public get age(): number {
    return this._age;
  }

}