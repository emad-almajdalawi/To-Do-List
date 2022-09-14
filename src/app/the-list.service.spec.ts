import { TestBed } from '@angular/core/testing';

import { TheListService } from './the-list.service';

describe('TheListService', () => {
  let service: TheListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
