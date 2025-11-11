import { Directive, Injectable } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export const isDateTime: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  // console.warn('control.value', control.value);
  // console.warn('typeof control.value', typeof control.value);
  // console.warn('control.value as Date', control.value as Date);
  // console.warn('control.value.getTime()', control.value.getTime());
  // console.warn('control.value.valueOf()', control.value.valueOf());
  /*
  console.warn(
    '(control.value as Date).getTime()',
    (control.value as Date).getTime()
  );
*/

  /*

  // control.value === null
  ->
  (control.value as Date)?.getTime() === undefined
  ->
  !((control.value as Date)?.getTime()) === true

  // control.value === Invalid Date
  ->
  (control.value as Date)?.getTime() === NaN
  ->
  !((control.value as Date)?.getTime()) === true
  */

  /*
  console.warn(
    '(control.value as Date)?.getTime()',
    (control.value as Date)?.getTime()
  );

  console.warn(
    '!((control.value as Date)?.getTime())',
    !(control.value as Date)?.getTime()
  );
  */

  // const notDateTime = !(control.value as Date)?.getTime();
  const notDateTime = !(control.value as Date)?.valueOf();

  return notDateTime ? { validDateTime: true } : null;
};

@Injectable({ providedIn: 'root' })
export class DateTimeValidator implements Validator {
  static isDateTime = isDateTime;

  validate(control: AbstractControl): ValidationErrors | null {
    return isDateTime(control);
  }
}

@Directive({
    selector: '[appDateTime]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: DateTimeValidatorDirective,
            multi: true,
        },
    ],
    standalone: false
})
export class DateTimeValidatorDirective implements Validator {
  constructor(private readonly validator: DateTimeValidator) {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator.validate(control);
  }
}
