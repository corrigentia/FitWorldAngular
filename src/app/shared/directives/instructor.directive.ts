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
import { InstructorService } from '../../instructor/services/instructor.service';

@Injectable({ providedIn: 'root' })
export class UniqueInstructorValidator implements AsyncValidator {
  constructor(private instructorService: InstructorService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const firstName = control.get('firstName');
    const lastName = control.get('lastName');

    if (!firstName || !lastName) {
      return of(null);
    }

    return this.instructorService
      .isEntityRegistered(firstName.value.trim(), lastName.value?.trim())
      .pipe(
        map((isRegistered) =>
          isRegistered ? { uniqueInstructor: true } : null
        ),
        catchError(() => of(null))
      );
  }
}

@Directive({
  selector: '[appUniqueInstructor]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueInstructorValidatorDirective),
      multi: true,
    },
  ],
})
export class UniqueInstructorValidatorDirective implements AsyncValidator {
  constructor(private validator: UniqueInstructorValidator) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.validator.validate(control);
  }
}
