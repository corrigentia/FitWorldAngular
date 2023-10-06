import { FormControl } from '@angular/forms';
import {
  DigitCharValidator,
  DigitCharValidatorDirective,
} from './digit-char.directive';

describe('DigitCharDirective', () => {
  it('should create an instance', () => {
    const digitCharValidator: DigitCharValidator = new DigitCharValidator();
    const directive = new DigitCharValidatorDirective(digitCharValidator);
    expect(directive).toBeTruthy();

    expect(digitCharValidator.validate(new FormControl('123456'))).toBeNull();

    expect(digitCharValidator.validate(new FormControl('abc'))).toEqual({
      digitChar: true,
    });
  });
});
