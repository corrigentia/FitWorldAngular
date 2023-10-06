import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, delay, first, map } from 'rxjs/operators';
import { ClassService } from '../../class/services/class.service';

@Injectable({ providedIn: 'root' })
export class UniqueClassValidator implements AsyncValidator {
  constructor(private classService: ClassService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const instructorId = control.get('instructorId');
    const dateTime = control.get('dateTime');

    if (!instructorId || !dateTime) {
      return of(null);
    }

    return this.classService
      .isEntityRegistered(instructorId.value, dateTime.value)
      .pipe(
        map((isRegistered) => (isRegistered ? { uniqueClass: true } : null)),
        catchError(() => of(null))
      );
  }
}

@Directive({
  selector: '[appUniqueClass]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueClassValidatorDirective),
      multi: true,
    },
  ],
})
export class UniqueClassValidatorDirective implements AsyncValidator {
  constructor(private validator: UniqueClassValidator) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.validator.validate(control);
  }
}
