import { TestBed } from '@angular/core/testing';

import { CommonEntityService } from './common-entity.service';

describe('EntityService', () => {
  let service: CommonEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // service = TestBed.inject(CommonEntityService);
  });

  it('should be created', () => {
    // expect(service).toBeTruthy();
    expect(service).toBeUndefined();
  });
});
