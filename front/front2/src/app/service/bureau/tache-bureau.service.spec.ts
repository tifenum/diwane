import { TestBed } from '@angular/core/testing';

import { TacheBureauService } from './tache-bureau.service';

describe('TacheBureauService', () => {
  let service: TacheBureauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TacheBureauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
