import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { GeolocationService } from '../_services/geolocation.service';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.css']
})
export class LocationPickerComponent implements OnInit {
  public isVisible = false;

  public latitude: number = 53.9051257;
  public longitude: number = 30.3588729;
  public position: string = `latitude: ${this.latitude}, longitude: ${this.longitude}`;

  public locationJson = [];

  @Output() onLocationPickerOK = new EventEmitter<any>();

  constructor(private _geolocationService: GeolocationService) { }

  ngOnInit() {
    this._geolocationService.getLocation(this.latitude, this.longitude)
                            .subscribe(data => {
                              data.forEach(element => {
                                this.locationJson.push(element);
                              });
                            });
    console.log(this.locationJson);
  }


  public onKeydownLocationInput(event: KeyboardEvent): void {
    event.preventDefault();
  }

  public onLocationPick(): void {
    this.isVisible = !this.isVisible;
  }

  public onLocationOK(latitude, longitude): void {
    this._geolocationService.getLocation(this.latitude, this.longitude)
                            .subscribe(data => {
                              data.forEach(element => {
                                this.locationJson.push(element);
                              });
                            });
    this.latitude = latitude;
    this.longitude = longitude;
    this.isVisible = !this.isVisible;
    let coords = {
      latitude: this.latitude,
      longitude: this.longitude,
      address: this.locationJson
    };
    this.onLocationPickerOK.emit(coords);
  }

  public onLocationCancel(): void {
    this.isVisible = !this.isVisible;
  }

}
