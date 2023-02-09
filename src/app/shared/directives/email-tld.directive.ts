import { Directive, Injectable } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export const hasTld: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const noTld =
    control &&
    control.value &&
    (control.value.substring(control.value.lastIndexOf('.')).length - 1 < 2 ||
      control.value.lastIndexOf('@', control.value.lastIndexOf('.')) < 0);

  return noTld ? { emailTld: true } : null;
};

@Injectable({ providedIn: 'root' })
export class EmailTldValidator implements Validator {
  static hasTld = hasTld;

  validate(control: AbstractControl): ValidationErrors | null {
    return hasTld(control);
  }
}

@Directive({
  selector: '[appEmailTld]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailTldValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailTldValidatorDirective implements Validator {
  constructor(private readonly validator: EmailTldValidator) {}

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validator.validate(control);
  }
}
