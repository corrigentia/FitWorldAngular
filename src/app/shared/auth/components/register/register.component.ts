import { UserTokenDTO } from './../../../session/interfaces/user-token-d-t-o';
import { firstNameLastNameEmailPasswordRegistrationForm } from './../../forms/first-name-last-name-email-password-register-form';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { StudentSpring } from 'src/app/models/student-spring';
import { AuthResponse } from '../../interfaces/auth-response';
import { UserRegistration } from '../../interfaces/user-registration';
import { AuthService } from '../../services/auth.service';

export type IForm<T> = {
  // [K in keyof T]?: any;
  [K in keyof T]: any;
};

const registrationFormConst: IForm<UserRegistration> = {
  firstName: [''],
  lastName: [''],
  email: [''],
  password: [''],
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  // styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  protected /*readonly*/ registrationForm = new FormGroup<
    typeof registrationFormConst
  >({
    firstName: new FormControl<string>('', {
      validators: [Validators.required],
    }),

    lastName: new FormControl<string>(''),

    email: new FormControl<string>('', {
      validators: [Validators.required],
    }),

    password: new FormControl<string>('', {
      validators: [Validators.required],
    }),
  });

  // registrationForm: FormGroup;
  /*
  <
  {
    firstName: FormControl<unknown>;
    lastName?: FormControl<unknown> | undefined;
    username: FormControl<unknown>;
    password: FormControl<unknown>;
  }
  >
  */

  /*
  protected readonly registrationForm: IForm<UserRegistration> = {
    firstName: [''],
    lastName: [''],
    email: [''],
    password: [''],
  };
  */

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    // this.registrationForm = this.fb.group(registrationForm);
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.registrationForm = this.fb.group({
      ...firstNameLastNameEmailPasswordRegistrationForm,
    });
  }

  onSubmit() {
    console.log('registrationForm:', this.registrationForm);

    if (this.registrationForm.invalid) {
      return;
    }

    this.authService
      .registerStudent(
        new StudentSpring(
          this.registrationForm.value.firstName ?? '',

          this.registrationForm.value.lastName ?? null,

          this.registrationForm.value.email ?? '',

          this.registrationForm.value.password ?? ''
        )

        // this.registrationForm.value
      )
      // .subscribe((authResponse: AuthResponse) => {
      .subscribe((userTokenDTO: UserTokenDTO) => {
        console.log(`data after registration: ${userTokenDTO}`);
        console.log(`data after registration: ${JSON.stringify(userTokenDTO)}`);

        // console.log('authResponse.user: ', authResponse.user);
        console.log('authResponse.user: ', userTokenDTO);

        // if (authResponse.user) {
        if (userTokenDTO.token) {
          console.log('we should have a user at this point');

          this.registrationForm.reset();
          this.router.navigate(['log-in']);
        }
      });
  }
}
