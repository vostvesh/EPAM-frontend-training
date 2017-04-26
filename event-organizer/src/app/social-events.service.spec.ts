import { TestBed, inject } from '@angular/core/testing';

import { SocialEventsService } from './social-events.service';

describe('SocialEventsListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialEventsService]
    });
  });

  it('should ...', inject([SocialEventsService], (service: SocialEventsService) => {
    expect(service).toBeTruthy();
  }));
});
