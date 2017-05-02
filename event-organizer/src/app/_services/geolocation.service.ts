import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GeolocationService {
  private _geolocationApiUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json?';
  private _googleMapsApiKey: string = 'AIzaSyANRpaSKHpPaW_d5AiQNiLromrc-YQLX4k';

  constructor(private _http: Http) {}

  private extractData(res: Response) {
    let body = res.json().results;
    return body;
  }

  public getLocation(lat: number, lng: number): Observable<any> {
    let requestUrl = `${this._geolocationApiUrl}latlng=${lat},${lng}&key=${this._googleMapsApiKey}`;
    return this._http.get(requestUrl).map(this.extractData);
  }

}