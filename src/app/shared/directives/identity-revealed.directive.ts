import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export const identityRevealedValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  /*
  const name = control.get('name');
  const alterEgo = control.get('alterEgo');
  */

  const firstName = control.get('firstName');
  const lastName = control.get('lastName');

  /*
  return name && alterEgo && name.value === alterEgo.value
    ? {
        identityRevealed: true,
      }
    : null;
  */

  return firstName && lastName && firstName.value === lastName.value
    ? {
        identityRevealed: true,
      }
    : null;
};

@Directive({
  selector: '[appIdentityRevealed]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IdentityRevealedValidatorDirective,
      multi: true,
    },
  ],
})
export class IdentityRevealedValidatorDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    return identityRevealedValidator(control);
  }
}
