import { TestBed } from '@angular/core/testing';

import { ClassSearchService } from './class-search.service';

describe('ClassSearchService', () => {
  let service: ClassSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
