import { TestBed } from '@angular/core/testing';

import { InspectateurService } from './inspectateur.service';

describe('DemandeService', () => {
  let service:InspectateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspectateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
