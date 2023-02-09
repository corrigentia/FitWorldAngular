import { TestBed } from '@angular/core/testing';

import { EquipmentsResolver } from './equipments.resolver';

describe('EquipmentsResolver', () => {
  let resolver: EquipmentsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EquipmentsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
