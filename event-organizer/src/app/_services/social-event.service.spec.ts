import { TestBed, inject } from '@angular/core/testing';

import { SocialEventService } from './social-event.service';

describe('SocialEventsListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialEventService]
    });
  });

  it('should ...', inject([SocialEventService], (service: SocialEventService) => {
    expect(service).toBeTruthy();
  }));
});
