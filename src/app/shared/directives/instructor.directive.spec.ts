import { InstructorService } from 'src/app/instructor/services/instructor.service';
import {
  UniqueInstructorValidator,
  UniqueInstructorValidatorDirective,
} from './instructor.directive';
import { TestBed } from '@angular/core/testing';
import { Logger } from '../services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InstructorDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Logger],
      imports: [HttpClientTestingModule],
    });
  });

  it('should create an instance', () => {
    const service = TestBed.inject(InstructorService);

    const validator = new UniqueInstructorValidator(service);

    const directive = new UniqueInstructorValidatorDirective(validator);
    expect(directive).toBeTruthy();
  });
});
