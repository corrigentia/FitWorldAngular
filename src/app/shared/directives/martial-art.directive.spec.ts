import { MartialArtService } from 'src/app/martial-art/services/martial-art.service';
import {
  UniqueMartialArtValidator,
  UniqueMartialArtValidatorDirective,
} from './martial-art.directive';
import { TestBed } from '@angular/core/testing';
import { Logger } from '../services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MartialArtDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  it('should create an instance', () => {
    const service = TestBed.inject(MartialArtService);

    const validator = new UniqueMartialArtValidator(service);

    const directive = new UniqueMartialArtValidatorDirective(validator);
    expect(directive).toBeTruthy();
  });
});
