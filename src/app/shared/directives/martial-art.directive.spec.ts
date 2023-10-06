import { MartialArtService } from 'src/app/martial-art/services/martial-art.service';
import {
  UniqueMartialArtValidator,
  UniqueMartialArtValidatorDirective,
} from './martial-art.directive';
import { TestBed } from '@angular/core/testing';
import { Logger } from '../services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MartialArtDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Logger],
    });
  });

  it('should create an instance', () => {
    const service = TestBed.inject(MartialArtService);

    const validator = new UniqueMartialArtValidator(service);

    const directive = new UniqueMartialArtValidatorDirective(validator);
    expect(directive).toBeTruthy();
  });
});
