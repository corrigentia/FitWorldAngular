import {
  SymbolCharValidator,
  SymbolCharValidatorDirective,
} from './symbol-char.directive';

describe('SymbolCharDirective', () => {
  it('should create an instance', () => {
    const validator = new SymbolCharValidator();

    const directive = new SymbolCharValidatorDirective(validator);
    expect(directive).toBeTruthy();
  });
});
