import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StudentService } from '../../student/services/student.service';

// class TService extends StudentService {}

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  // constructor(private readonly studentService: TService) {
  constructor(private readonly studentService: StudentService) {
    console.warn('in unique email validator class ctor');
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    console.warn('in unique email validator class validate');
    // console.warn('control', `'${JSON.stringify(control)}'`);
    // console.warn('control.value', `'${control.value}'`);
    // console.warn('control.value.trim()', `'${control.value.trim()}'`);
    /*
    console.warn(
      'this.studentService.isEmailRegistered(control.value.trim())',
      `'${JSON.stringify(
        this.studentService.isEmailRegistered(control.value.trim()).subscribe()
      )}'`
    );
    */

    this.studentService
      // .isEmailRegistered(control.value.trim())
      .isEntityRegistered(control.value.trim())
      .subscribe((isRegistered) => console.warn(isRegistered));

    // return this.studentService.isEmailRegistered(control.value.trim()).pipe(
    return this.studentService.isEntityRegistered(control.value.trim()).pipe(
      map((isRegistered) => (isRegistered ? { uniqueEmail: true } : null)),
      catchError(() => of(null))
    );
  }
}

@Directive({
  selector: '[appUniqueEmail]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueEmailValidatorDirective),
      multi: true,
    },
  ],
})
export class UniqueEmailValidatorDirective implements AsyncValidator {
  constructor(private readonly validator: UniqueEmailValidator) {
    console.warn('in unique email directive ctor');
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    console.warn('in unique email directive validate');
    return this.validator.validate(control);
  }
}
