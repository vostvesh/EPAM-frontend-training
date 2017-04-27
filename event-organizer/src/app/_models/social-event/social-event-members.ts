export class SocialEventMembers {
  private _numberOfMembers: number;
  private _gender: string;
  private _minAge: number;
  private _maxAge: number;

  private isCorrectAge(age: number): boolean {
    if (age <= 0) {
      throw new Error(`{age} must be above 0`);
    } else if (age > 120) {
      throw new Error(`{age} must be below 120`);
    }
    return true;
  }

  constructor(numberOfMembers: number, minAge: number, maxAge: number, gender: string) {
    if (!+numberOfMembers) {
      throw new Error(`Incorrect {numberOfMembers}: ${numberOfMembers}`);
    }

    if (!this.isCorrectAge(minAge)) {
      throw new Error(`Incorrect {minAge}: ${minAge}`);
    }

    if (!this.isCorrectAge(maxAge)) {
      throw new Error(`Incorrect {maxAge}: ${maxAge}`);
    }

    if (minAge > maxAge) {
      throw new Error(`{minAge} must be lower then {maxAge}`);
    }

    if (!gender) {
      throw new Error(`{gender} not equals 'male' or 'female' or 'both'`);
    }

    this._gender = gender;
    this._numberOfMembers = numberOfMembers;
    this._maxAge = maxAge;
    this._minAge = minAge;
  }


  public get numberOfMembers(): number {
    return this._numberOfMembers;
  }

  public get gender(): string {
    return this._gender;
  }

  public get minAge(): number {
    return this._minAge;
  }

  public get maxAge(): number {
    return this._maxAge;
  }
}