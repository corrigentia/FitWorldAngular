import { Email } from './email';
import { Password } from './password';

export interface EmailPassword extends Email,Password {
  // password: string;
}
