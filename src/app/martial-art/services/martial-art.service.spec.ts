import { TestBed } from '@angular/core/testing';

import { MartialArtService } from './martial-art.service';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MartialArtService', () => {
  let service: MartialArtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Logger],
    });
    service = TestBed.inject(MartialArtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
