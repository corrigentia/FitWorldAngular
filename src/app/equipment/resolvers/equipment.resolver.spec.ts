import { TestBed } from '@angular/core/testing';

import { EquipmentResolver } from './equipment.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EquipmentResolver', () => {
  let resolver: EquipmentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Logger],
    });
    resolver = TestBed.inject(EquipmentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
