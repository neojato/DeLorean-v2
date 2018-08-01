import { HttpClient } from '@angular/common/http';
import { firebaseConfig } from './../../../environments/firebase.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class GeocoderApiService {
  apiKey: string;
  apiURL: string;

  constructor(private http: HttpClient) {
    this.apiKey = firebaseConfig.mapsKey;
    this.apiURL = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.apiKey}&address=`;
  }

  findFromAddress(address: string): Observable<any> {
    const compositeAddress = encodeURIComponent(address.replace(/^\s+|\s+$/g, '+'));
    const url = `${this.apiURL}${compositeAddress}`;
    return this.http.get(url);
  }

}
