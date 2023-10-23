import { Validators } from '@angular/forms';
import { UserRegistration } from '../interfaces/user-registration';

export const firstNameLastNameEmailPasswordRegistrationForm = {
  email: ['', Validators.required],
  password: ['', Validators.required],
  firstName: ['', Validators.required],
  lastName: [''],
};
