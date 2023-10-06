import { TestBed } from '@angular/core/testing';

import { ClassService } from './class.service';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClassService', () => {
  let service: ClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Logger],
    });
    service = TestBed.inject(ClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
