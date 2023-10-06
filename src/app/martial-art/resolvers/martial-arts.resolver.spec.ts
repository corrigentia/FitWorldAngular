import { TestBed } from '@angular/core/testing';

import { MartialArtsResolver } from './martial-arts.resolver';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Logger } from 'src/app/shared/services/logger.service';

describe('MartialArtsResolver', () => {
  let resolver: MartialArtsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Logger],
    });
    resolver = TestBed.inject(MartialArtsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
