import { TestBed, inject } from '@angular/core/testing';

import { GeocoderApiService } from './geocoder-api.service';

describe('GeocoderApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeocoderApiService]
    });
  });

  it('should be created', inject([GeocoderApiService], (service: GeocoderApiService) => {
    expect(service).toBeTruthy();
  }));
});
