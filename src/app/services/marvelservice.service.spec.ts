import { TestBed } from '@angular/core/testing';

import { MarvelserviceService } from './marvelservice.service';

describe('MarvelserviceService', () => {
  let service: MarvelserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarvelserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
