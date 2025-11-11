import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export const hasLowercaseChar: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const lowercaseCharPresent =
    control && control.value && /[a-z]+/.test(control.value);

  return lowercaseCharPresent ? null : { lowercaseChar: true };
};

@Injectable({ providedIn: 'root' })
export class LowercaseCharValidator implements Validator {
  static hasLowercaseChar = hasLowercaseChar;

  validate(control: AbstractControl): ValidationErrors | null {
    return hasLowercaseChar(control);
  }
}

@Directive({
    selector: '[appLowercaseChar]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: LowercaseCharValidatorDirective,
            multi: true,
        },
    ],
    standalone: false
})
export class LowercaseCharValidatorDirective implements Validator {
  constructor(private readonly validator: LowercaseCharValidator) {}

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validator.validate(control);
  }
}
