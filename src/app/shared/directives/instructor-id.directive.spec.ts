import {
  InstructorIdValidator,
  InstructorIdValidatorDirective,
} from './instructor-id.directive';

describe('InstructorIdDirective', () => {
  it('should create an instance', () => {
    const validator = new InstructorIdValidator();

    const directive = new InstructorIdValidatorDirective(validator);
    expect(directive).toBeTruthy();
  });
});
