import { TestBed } from '@angular/core/testing';

import { EquipmentsResolver } from './equipments.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EquipmentsResolver', () => {
  let resolver: EquipmentsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    resolver = TestBed.inject(EquipmentsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
