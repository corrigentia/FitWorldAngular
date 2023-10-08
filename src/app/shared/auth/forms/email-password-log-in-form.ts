import { Validators } from '@angular/forms';

export const emailPasswordLogInForm = {
  email: [null, Validators.required],
  password: [null, Validators.required],
};
