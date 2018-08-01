import { TestBed, inject } from '@angular/core/testing';

import { ChallengesService } from './challenges.service';

describe('ChallengesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChallengesService]
    });
  });

  it('should be created', inject([ChallengesService], (service: ChallengesService) => {
    expect(service).toBeTruthy();
  }));
});
