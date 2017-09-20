import { TestBed, inject } from '@angular/core/testing';

import { LevelService } from './level.service';

describe('LevelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LevelService]
    });
  });

  it('should be created', inject([LevelService], (service: LevelService) => {
    expect(service).toBeTruthy();
  }));
});
