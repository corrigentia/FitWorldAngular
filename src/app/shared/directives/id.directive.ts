import { Directive, Injectable } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export const isId: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const notId = control.value === 0;

  return notId ? { validId: true } : null;
};

@Injectable({ providedIn: 'root' })
export class IdValidator implements Validator {
  static isId = isId;

  validate(control: AbstractControl): ValidationErrors | null {
    return isId(control);
  }
}

@Directive({
  selector: '[appId]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IdValidatorDirective,
      multi: true,
    },
  ],
})
export class IdValidatorDirective implements Validator {
  constructor(private readonly validator: IdValidator) {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator.validate(control);
  }
}
