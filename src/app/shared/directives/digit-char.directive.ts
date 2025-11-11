import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export const hasDigitChar: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const digitCharPresent =
    control && control.value && /[0-9]+/.test(control.value);

  return digitCharPresent ? null : { digitChar: true };
};

@Injectable({ providedIn: 'root' })
export class DigitCharValidator implements Validator {
  static hasDigitChar = hasDigitChar;

  validate(control: AbstractControl): ValidationErrors | null {
    return hasDigitChar(control);
  }
}

@Directive({
    selector: '[appDigitChar]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: DigitCharValidatorDirective,
            multi: true,
        },
    ],
    standalone: false
})
export class DigitCharValidatorDirective implements Validator {
  constructor(private readonly validator: DigitCharValidator) {}

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validator.validate(control);
  }
}
