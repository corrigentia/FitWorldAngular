import { emailPasswordLogInForm } from './../../forms/email-password-log-in-form';
import { Router } from '@angular/router';
import { SessionService } from './../../../session/services/session.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginCtor } from '../../classes/models/login-ctor';
import { IUserLogInForm } from '../../interfaces/login';
import { AuthService } from '../../services/auth.service';
import { UserTokenDTO } from '../../../session/interfaces/user-token-d-t-o';

export type IForm<T> = {
  [K in keyof T]: any;
};

const loginFormConst: IForm<IUserLogInForm> = {
  email: new FormControl<string>('', {
    validators: [Validators.required],
  }),

  password: new FormControl<string>('', {
    validators: [Validators.required],
  }),
};

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  // loginForm: FormGroup;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', {
      validators: [Validators.required],
    }),

    password: new FormControl<string>('', {
      validators: [Validators.required],
    }),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly _session: SessionService,
    private readonly _router: Router
  ) {
    // this.loginForm = this.fb.group(loginForm);
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.loginForm = this.fb.group({ ...emailPasswordLogInForm });
  }

  onSubmit() {
    console.log('loginForm:', this.loginForm);

    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .logInStudent(
        /*
        new LoginCtor(
          this.loginForm.value.email,

          this.loginForm.value.password
        )
        */
        this.loginForm.value
      )
      .subscribe({
        next: (value: UserTokenDTO) => {
          this._session.start(value);

          this._router.navigate(['home']);
        },
      });
  }
}
