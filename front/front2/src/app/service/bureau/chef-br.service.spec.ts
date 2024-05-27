import { TestBed } from '@angular/core/testing';

import { ChefBRService } from './chef-br.service';

describe('ChefBRService', () => {
  let service: ChefBRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChefBRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
