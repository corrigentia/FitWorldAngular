import { ClassService } from 'src/app/class/services/class.service';
import {
  UniqueClassValidator,
  UniqueClassValidatorDirective,
} from './class.directive';
import { TestBed } from '@angular/core/testing';
import { Logger } from '../services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ClassDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  it('should create an instance', () => {
    const service = TestBed.inject(ClassService);

    const validator = new UniqueClassValidator(service);

    const directive = new UniqueClassValidatorDirective(validator);
    expect(directive).toBeTruthy();
  });
});
