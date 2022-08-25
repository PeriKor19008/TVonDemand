import { TestBed } from '@angular/core/testing';

import { GetViewTypeService } from './get-view-type.service';

describe('GetViewTypeService', () => {
  let service: GetViewTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetViewTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
