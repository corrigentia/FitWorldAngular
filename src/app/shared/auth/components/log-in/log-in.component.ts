import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginCtor } from '../../classes/models/login-ctor';
import { Login } from '../../interfaces/login';
import { AuthService } from '../../services/auth.service';

export type IForm<T> = {
  [K in keyof T]: any;
};

const loginFormConst: IForm<Login> = {
  username: new FormControl<string>('', {
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
export class LogInComponent {
  // loginForm: FormGroup;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl<string>('', {
      validators: [Validators.required],
    }),

    password: new FormControl<string>('', {
      validators: [Validators.required],
    }),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder
  ) {
    // this.loginForm = this.fb.group(loginForm);
  }

  onSubmit() {
    console.log('loginForm:', this.loginForm);

    this.authService.logInStudent(
      new LoginCtor(
        this.loginForm.value.username,

        this.loginForm.value.password
      )
    );
  }
}
