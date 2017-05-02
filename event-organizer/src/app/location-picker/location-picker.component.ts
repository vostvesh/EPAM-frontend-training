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
  public position: string = '';

  public locationJson = [];

  @Output() onLocationPickerOK = new EventEmitter<any>();

  constructor(private _geolocationService: GeolocationService) { }

  ngOnInit() {
    this._geolocationService.getLocation(this.latitude, this.longitude)
      .subscribe(data => {
        data.forEach(element => {
          this.locationJson.push(element);
        });

        this.position = `${this.locationJson[0].formatted_address}`;
      });
  }

  public onKeydownLocationInput(event: KeyboardEvent): void {
    event.preventDefault();
  }

  public onMarkerDragEnd(event): void {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

  public onLocationPick(): void {
    this.isVisible = !this.isVisible;
  }

  public onMapClicked(event): void {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

  public onLocationOK(latitude, longitude): void {
    this.isVisible = !this.isVisible;
    this.locationJson = [];
    this._geolocationService.getLocation(this.latitude, this.longitude)
      .subscribe(data => {
        data.forEach(element => {
          this.locationJson.push(element);
        });

        this.position = `${this.locationJson[0].formatted_address}`;

        let coords = {
          latitude: this.latitude,
          longitude: this.longitude,
          address: this.locationJson
        };
        this.onLocationPickerOK.emit(coords);
      });
  }

  public onLocationCancel(): void {
    this.isVisible = !this.isVisible;
  }

}
