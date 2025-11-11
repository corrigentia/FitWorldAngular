import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export const hasSymbolChar: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const symbolRegex = /[$-/:-?{-~!"^_@`\[\]]/g;

  const symbolCharPresent =
    control && control.value && symbolRegex.test(control.value);

  return symbolCharPresent ? null : { symbolChar: true };
};

@Injectable({ providedIn: 'root' })
export class SymbolCharValidator implements Validator {
  static hasSymbolChar = hasSymbolChar;

  validate(control: AbstractControl): ValidationErrors | null {
    return hasSymbolChar(control);
  }
}

@Directive({
    selector: '[appSymbolChar]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: SymbolCharValidatorDirective,
            multi: true,
        },
    ],
    standalone: false
})
export class SymbolCharValidatorDirective implements Validator {
  constructor(private readonly validator: SymbolCharValidator) {}

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validator.validate(control);
  }
}
