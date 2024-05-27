import { TestBed } from '@angular/core/testing';

import { ContService } from './cont.service';

describe('ContService', () => {
  let service: ContService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
