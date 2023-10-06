import { IdValidator, IdValidatorDirective } from './id.directive';

describe('IdDirective', () => {
  it('should create an instance', () => {
    const validator = new IdValidator();

    const directive = new IdValidatorDirective(validator);
    expect(directive).toBeTruthy();
  });
});
