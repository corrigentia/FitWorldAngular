import { Directive, Injectable } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export const noWhiteSpace: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  // console.warn('control', control);
  // console.warn('control.value', control.value);

  // const whiteSpacePresent = (control.value as string).indexOf(' ') >= 0;
  const whiteSpacePresent =
    control && control.value && control.value.indexOf(' ') >= 0;

  return whiteSpacePresent ? { noWhiteSpace: true } : null;
};

@Injectable({ providedIn: 'root' })
export class WhiteSpaceValidator implements Validator {
  static noWhiteSpace = noWhiteSpace;

  validate(control: AbstractControl): ValidationErrors | null {
    return noWhiteSpace(control);
  }
}

@Directive({
  selector: '[appNoWhiteSpace]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: WhiteSpaceValidatorDirective,
      multi: true,
    },
  ],
})
export class WhiteSpaceValidatorDirective implements Validator {
  constructor(private readonly validator: WhiteSpaceValidator) {}

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validator.validate(control);
  }
}
