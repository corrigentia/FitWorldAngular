import { TestBed } from '@angular/core/testing';

import { MartialArtsResolver } from './martial-arts.resolver';

describe('MartialArtsResolver', () => {
  let resolver: MartialArtsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MartialArtsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
