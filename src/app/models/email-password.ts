import { Email } from './email';
import { Password } from './password';

export class EmailPassword implements Email, Password {
  // password: string;
  // email: string;
  /**
   *
   */
  constructor(public email: string, public password: string) {
    // this.email = email;
  }
}
