import {
  EmailTldValidator,
  EmailTldValidatorDirective,
} from './email-tld.directive';

describe('EmailTldDirective', () => {
  it('should create an instance', () => {
    const validator = new EmailTldValidator();

    const directive = new EmailTldValidatorDirective(validator);
    expect(directive).toBeTruthy();
  });
});
