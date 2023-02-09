import { UniqueEmailValidatorDirective } from './email.directive';

describe('EmailDirective', () => {
  it('should create an instance', () => {
    const directive = new UniqueEmailValidatorDirective();
    expect(directive).toBeTruthy();
  });
});
