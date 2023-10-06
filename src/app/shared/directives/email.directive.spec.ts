import { StudentService } from 'src/app/student/services/student.service';
import {
  UniqueEmailValidator,
  UniqueEmailValidatorDirective,
} from './email.directive';
import { TestBed } from '@angular/core/testing';
import { Logger } from '../services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EmailDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Logger],
    });
  });

  it('should create an instance', () => {
    const service = TestBed.inject(StudentService);

    const validator = new UniqueEmailValidator(service);

    const directive = new UniqueEmailValidatorDirective(validator);
    expect(directive).toBeTruthy();
  });
});
