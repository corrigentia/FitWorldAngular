import { UniqueClassValidatorDirective } from './class.directive';

describe('ClassDirective', () => {
  it('should create an instance', () => {
    const directive = new UniqueClassValidatorDirective();
    expect(directive).toBeTruthy();
  });
});
