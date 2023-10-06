import {
  LowercaseCharValidator,
  LowercaseCharValidatorDirective,
} from './lowercase-char.directive';

describe('LowercaseCharDirective', () => {
  it('should create an instance', () => {
    const validator = new LowercaseCharValidator();

    const directive = new LowercaseCharValidatorDirective(validator);
    expect(directive).toBeTruthy();
  });
});
