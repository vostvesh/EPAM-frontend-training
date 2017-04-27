export class SocialEventInfo {
  private _category: string;
  private _description: string;
  private _eventName: string;

  constructor(category: string, eventName: string, description: string) {
    if (!category) {
      throw new Error(`Incorrect {category}: ${category}`);
    }

    if (!description) {
      throw new Error(`Incorrect {description}: ${description}`);
    }

    if (!eventName) {
      throw new Error(`Incorrect {name}: ${eventName}`);
    }

    this._category = category;
    this._description = description;
    this._eventName = eventName;
  }

  public get category(): string {
    return this._category;
  }

  public get description(): string {
    return this._description;
  }

  public get eventName(): string {
    return this._eventName;
  }
}