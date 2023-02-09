import { TestBed } from '@angular/core/testing';

import { MartialArtService } from './martial-art.service';

describe('MartialArtService', () => {
  let service: MartialArtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MartialArtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
