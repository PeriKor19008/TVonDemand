import { TestBed } from '@angular/core/testing';

import { MostPopularService } from './most-popular.service';

describe('MostPopularService', () => {
  let service: MostPopularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostPopularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
