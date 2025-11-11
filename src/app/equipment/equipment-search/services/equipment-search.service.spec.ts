import { TestBed } from '@angular/core/testing';

import { EquipmentSearchService } from './equipment-search.service';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EquipmentSearchService', () => {
  let service: EquipmentSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(EquipmentSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
