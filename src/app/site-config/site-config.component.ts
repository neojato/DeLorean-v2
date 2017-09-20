import { GeocoderApiService } from './../services/geocoder-api.service';
import { Router } from '@angular/router';
import { SiteConfigService } from './shared/site-config.service';
import { SiteConfig } from './shared/site-config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-config',
  templateUrl: './site-config.component.html',
  styleUrls: ['./site-config.component.scss']
})
export class SiteConfigComponent implements OnInit {
  siteConfig: SiteConfig = new SiteConfig();
  addConfig: boolean = true;

  constructor(
    private siteConfigService: SiteConfigService,
    private geocoderService: GeocoderApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.siteConfigService.getConfig().subscribe(config => {
      this.siteConfig = config;
      if (config.groupName) {
        this.addConfig = false;
      }
    });
  }

  createConfig() {
    let photo: File;
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('venuePhoto')).files[0]]) {
      photo = selectedFile;
    }

    this.siteConfigService.createConfig(this.siteConfig, photo);

    if (this.siteConfig.venueAddress) {
      this.geocoderService.findFromAddress(this.siteConfig.venueAddress).subscribe(response => {
        if (response.status === 'OK') {
          this.siteConfig.venueGeoData = {
            lat: response.results[0].geometry.location.lat,
            lng: response.results[0].geometry.location.lng
          };
          this.siteConfigService.updateConfig(this.siteConfig);
        } else if (response.status === 'ZERO_RESULTS') {
          console.log('geocodingAPIService', 'ZERO_RESULTS', response.status);
        } else {
          console.log('geocodingAPIService', 'Other error', response.status);
        }
      });
    }

    this.siteConfig = new SiteConfig();
    this.router.navigate(['/']);
  }

  updateConfig() {
    let photo: File;
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('venuePhoto')).files[0]]) {
      photo = selectedFile;
    }

    this.siteConfigService.updateConfig(this.siteConfig, photo);

    if (this.siteConfig.venueAddress) {
      this.geocoderService.findFromAddress(this.siteConfig.venueAddress).subscribe(response => {
        if (response.status === 'OK') {
          this.siteConfig.venueGeoData = {
            lat: response.results[0].geometry.location.lat,
            lng: response.results[0].geometry.location.lng
          };
          this.siteConfigService.updateConfig(this.siteConfig);
        } else if (response.status === 'ZERO_RESULTS') {
          console.log('geocodingAPIService', 'ZERO_RESULTS', response.status);
        } else {
          console.log('geocodingAPIService', 'Other error', response.status);
        }
      });
    }

    this.siteConfig = new SiteConfig();
    this.router.navigate(['/']);
  }

}
