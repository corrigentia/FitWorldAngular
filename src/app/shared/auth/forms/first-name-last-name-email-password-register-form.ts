import { Validators } from '@angular/forms';

export const firstNameLastNameEmailPasswordRegistrationForm = {
  firstName: ['', Validators.required],
  lastName: [''],
  email: ['', Validators.required],
  password: ['', Validators.required],
};
