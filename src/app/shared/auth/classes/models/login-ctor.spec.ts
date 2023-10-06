import { LoginCtor } from './login-ctor';

describe('LoginCtor', () => {
  it('should create an instance', () => {
    expect(new LoginCtor('user@name.com', 'P@ssw0rd')).toBeTruthy();
  });
});
