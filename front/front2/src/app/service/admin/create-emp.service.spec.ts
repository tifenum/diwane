import { TestBed } from '@angular/core/testing';

import { CreateEmpService } from './create-emp.service';

describe('CreateEmpService', () => {
  let service: CreateEmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEmpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
