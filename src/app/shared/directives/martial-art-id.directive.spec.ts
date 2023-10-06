import {
  MartialArtIdValidator,
  MartialArtIdValidatorDirective,
} from './martial-art-id.directive';

describe('MartialArtIdDirective', () => {
  it('should create an instance', () => {
    const validator = new MartialArtIdValidator();

    const directive = new MartialArtIdValidatorDirective(validator);
    expect(directive).toBeTruthy();
  });
});
