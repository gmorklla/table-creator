import { TestBed } from '@angular/core/testing';

import { StaticTableService } from './static-table.service';

describe('StaticTableService', () => {
  let service: StaticTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
