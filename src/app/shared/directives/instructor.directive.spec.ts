import { InstructorService } from 'src/app/instructor/services/instructor.service';
import {
  UniqueInstructorValidator,
  UniqueInstructorValidatorDirective,
} from './instructor.directive';
import { TestBed } from '@angular/core/testing';
import { Logger } from '../services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('InstructorDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  it('should create an instance', () => {
    const service = TestBed.inject(InstructorService);

    const validator = new UniqueInstructorValidator(service);

    const directive = new UniqueInstructorValidatorDirective(validator);
    expect(directive).toBeTruthy();
  });
});
