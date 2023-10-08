import { Email } from './../../../interfaces/email';
import { FirstName } from 'src/app/interfaces/first-name';
import { LastName } from 'src/app/interfaces/last-name';
import { Password } from 'src/app/interfaces/password';
import { Username } from 'src/app/interfaces/username';

export interface UserRegistration
  extends FirstName,
    LastName,
    // Username,
    Email,
    Password {}
