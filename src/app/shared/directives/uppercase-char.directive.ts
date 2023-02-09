import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export const hasUppercaseChar: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const uppercaseCharPresent =
    control && control.value && /[A-Z]+/.test(control.value);

  return uppercaseCharPresent ? null : { uppercaseChar: true };
};

@Injectable({ providedIn: 'root' })
export class UppercaseCharValidator implements Validator {
  static hasUppercaseChar = hasUppercaseChar;

  validate(control: AbstractControl): ValidationErrors | null {
    return hasUppercaseChar(control);
  }
}

@Directive({
  selector: '[appUppercaseChar]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UppercaseCharValidatorDirective,
      multi: true,
    },
  ],
})
export class UppercaseCharValidatorDirective implements Validator {
  constructor(private readonly validator: UppercaseCharValidator) {}

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validator.validate(control);
  }
}
