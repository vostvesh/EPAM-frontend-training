export class SocialEventLocation {
  private _country: string;
  private _city: string;
  private _latitude?: number;
  private _longitude?: number;

  constructor(country: string, city: string, latitude?: number, longitude?: number) {
    if (!country) {
      throw new Error(`Incorrect {country}: ${country}`);
    }

    if (!city) {
      throw new Error(`Incorrect {city}: ${city}`);
    }

    this._country = country;
    this._city = city;
  }

  public get country(): string {
    return this._country;
  }

  public get city(): string {
    return this._city;
  }

  public get latitude(): number {
    return this._latitude;
  }

  public get longitude(): number {
    return this._longitude;
  }
}
