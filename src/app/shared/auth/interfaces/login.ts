import { Email } from './../../../interfaces/email';
import { Password } from 'src/app/interfaces/password';
import { Username } from 'src/app/interfaces/username';

// export interface Login extends Username, Password {}
export interface IUserLogInForm extends Email, Password {}
