import { TestBed, inject } from '@angular/core/testing';

import { SiteConfigService } from './site-config.service';

describe('SiteConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteConfigService]
    });
  });

  it('should be created', inject([SiteConfigService], (service: SiteConfigService) => {
    expect(service).toBeTruthy();
  }));
});
