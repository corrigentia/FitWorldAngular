import { TestBed } from '@angular/core/testing';

import { MartialArtResolver } from './martial-art.resolver';

describe('MartialArtResolver', () => {
  let resolver: MartialArtResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MartialArtResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
