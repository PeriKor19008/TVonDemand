import { TestBed } from '@angular/core/testing';

import { EditDbService } from './edit-db.service';

describe('EditDbService', () => {
  let service: EditDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
