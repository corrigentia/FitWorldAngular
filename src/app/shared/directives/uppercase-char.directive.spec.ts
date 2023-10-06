import {
  UppercaseCharValidator,
  UppercaseCharValidatorDirective,
} from './uppercase-char.directive';

describe('UppercaseCharDirective', () => {
  it('should create an instance', () => {
    const validator = new UppercaseCharValidator();

    const directive = new UppercaseCharValidatorDirective(validator);
    expect(directive).toBeTruthy();
  });
});
