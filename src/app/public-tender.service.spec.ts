import { TestBed } from '@angular/core/testing';

import { PublicTenderService } from './public-tender.service';

describe('PublicTenderService', () => {
  let service: PublicTenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicTenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
