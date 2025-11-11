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
export class UniqueUsernameValidator implements AsyncValidator {
  // constructor(private readonly studentService: TService) {
  // could NOT find TService and gave me a circular dependency error
  constructor(private readonly studentService: StudentService) {
    console.warn('in unique username validator class ctor');
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    console.warn('in unique username validator class validate');
    // console.warn('control', `'${JSON.stringify(control)}'`);
    // console.warn('control.value', `'${control.value}'`);
    // console.warn('control.value.trim()', `'${control.value.trim()}'`);
    /*
    console.warn(
      // 'this.studentService.isEmailRegistered(control.value.trim())',
      'this.studentService.isUsernameRegistered(control.value.trim())',
      `'${JSON.stringify(
        // this.studentService.isEmailRegistered(control.value.trim()).subscribe()
        this.studentService.isUsernameRegistered(control.value.trim()).subscribe()
      )}'`
    );
    */

    this.studentService
      // .isEmailRegistered(control.value.trim())
      .isEntityRegistered(control.value.trim())
      .subscribe((isRegistered) => console.warn(isRegistered));

    // return this.studentService.isEmailRegistered(control.value.trim()).pipe(
    return this.studentService.isEntityRegistered(control.value.trim()).pipe(
      // map((isRegistered) => (isRegistered ? { uniqueEmail: true } : null)),
      map((isRegistered) => (isRegistered ? { uniqueUsername: true } : null)),
      catchError(() => of(null))
    );
  }
}

@Directive({
    // selector: '[appUniqueEmail]',
    selector: '[appUniqueUsername]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            // useExisting: forwardRef(() => UniqueEmailValidatorDirective),
            useExisting: forwardRef(() => UniqueUsernameValidatorDirective),
            multi: true,
        },
    ],
    standalone: false
})
export class UniqueUsernameValidatorDirective implements AsyncValidator {
  constructor(private readonly validator: UniqueUsernameValidator) {
    console.warn('in unique username directive ctor');
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    console.warn('in unique username directive validate');
    return this.validator.validate(control);
  }
}
