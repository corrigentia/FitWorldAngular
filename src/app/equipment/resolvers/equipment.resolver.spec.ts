import { TestBed } from '@angular/core/testing';

import { EquipmentResolver } from './equipment.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EquipmentResolver', () => {
  let resolver: EquipmentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    resolver = TestBed.inject(EquipmentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
