import { ClassService } from 'src/app/class/services/class.service';
import {
  UniqueClassValidator,
  UniqueClassValidatorDirective,
} from './class.directive';
import { TestBed } from '@angular/core/testing';
import { Logger } from '../services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClassDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Logger],
    });
  });

  it('should create an instance', () => {
    const service = TestBed.inject(ClassService);

    const validator = new UniqueClassValidator(service);

    const directive = new UniqueClassValidatorDirective(validator);
    expect(directive).toBeTruthy();
  });
});
