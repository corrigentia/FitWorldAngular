import { TestBed } from '@angular/core/testing';

import { EquipmentService } from './equipment.service';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EquipmentService', () => {
  let service: EquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(EquipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
