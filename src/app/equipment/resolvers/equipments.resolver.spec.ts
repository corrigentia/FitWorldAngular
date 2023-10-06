import { TestBed } from '@angular/core/testing';

import { EquipmentsResolver } from './equipments.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EquipmentsResolver', () => {
  let resolver: EquipmentsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Logger],
      imports: [HttpClientTestingModule],
    });
    resolver = TestBed.inject(EquipmentsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
