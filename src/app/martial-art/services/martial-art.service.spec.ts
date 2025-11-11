import { TestBed } from '@angular/core/testing';

import { MartialArtService } from './martial-art.service';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MartialArtService', () => {
  let service: MartialArtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(MartialArtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
