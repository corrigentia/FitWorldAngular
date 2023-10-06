import { TestBed } from '@angular/core/testing';

import { EquipmentSearchService } from './equipment-search.service';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EquipmentSearchService', () => {
  let service: EquipmentSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Logger],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EquipmentSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
