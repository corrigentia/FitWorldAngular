import { TestBed } from '@angular/core/testing';

import { EquipmentService } from './equipment.service';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EquipmentService', () => {
  let service: EquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Logger],
    });
    service = TestBed.inject(EquipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
