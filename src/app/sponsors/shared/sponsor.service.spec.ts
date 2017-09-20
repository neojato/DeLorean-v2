import { TestBed, inject } from '@angular/core/testing';

import { SponsorService } from './sponsor.service';

describe('SponsorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SponsorService]
    });
  });

  it('should be created', inject([SponsorService], (service: SponsorService) => {
    expect(service).toBeTruthy();
  }));
});
