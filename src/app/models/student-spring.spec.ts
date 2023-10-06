import { StudentSpring } from './student-spring';

describe('StudentSpring', () => {
  it('should create an instance', () => {
    expect(
      new StudentSpring('First', null, 'user@name.com', 'P@ssw0rd')
    ).toBeTruthy();
  });
});
