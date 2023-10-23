import { StudentSpring } from './student-spring';

describe('StudentSpring', () => {
  it('should create an instance', () => {
    expect(
      new StudentSpring('user@name.com', 'P@ssw0rd', 'First', null)
    ).toBeTruthy();
  });
});
