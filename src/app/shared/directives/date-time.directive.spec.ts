import {
  DateTimeValidator,
  DateTimeValidatorDirective,
} from './date-time.directive';

describe('DateTimeDirective', () => {
  it('should create an instance', () => {
    const validator = new DateTimeValidator();

    const directive = new DateTimeValidatorDirective(validator);
    expect(directive).toBeTruthy();
  });
});
