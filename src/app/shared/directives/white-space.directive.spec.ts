import {
  WhiteSpaceValidator,
  WhiteSpaceValidatorDirective,
} from './white-space.directive';

describe('WhiteSpaceDirective', () => {
  it('should create an instance', () => {
    const validator = new WhiteSpaceValidator();

    const directive = new WhiteSpaceValidatorDirective(validator);
    expect(directive).toBeTruthy();
  });
});
