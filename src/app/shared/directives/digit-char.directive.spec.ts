import { FormControl } from '@angular/forms';
import {
  DigitCharValidator,
  DigitCharValidatorDirective,
} from './digit-char.directive';

describe('DigitCharDirective', () => {
  it('should create an instance', () => {
    const validator = new DigitCharValidator();
    const directive = new DigitCharValidatorDirective(validator);
    expect(directive).toBeTruthy();

    expect(validator.validate(new FormControl('123456'))).toBeNull();

    expect(validator.validate(new FormControl('abc'))).toEqual({
      digitChar: true,
    });
  });
});
