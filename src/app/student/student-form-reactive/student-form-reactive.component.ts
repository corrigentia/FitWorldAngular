import { Component, OnInit } from '@angular/core';
import {
  EmailValidator,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { STUDENTS } from 'src/app/db/cached-students';
import { EmailPassword } from 'src/app/models/email-password';
import { EmailPassword as IEmailPassword } from 'src/app/interfaces/email-password';
import { UniqueEmailValidator } from 'src/app/shared/directives/email.directive';
import { identityRevealedValidator } from 'src/app/shared/directives/identity-revealed.directive';
import {
  WhiteSpaceValidator,
  WhiteSpaceValidatorDirective,
} from 'src/app/shared/directives/white-space.directive';
import { StudentService } from 'src/app/shared/services/student.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { Logger } from 'src/app/shared/services/logger.service';
import { Router } from '@angular/router';
import { UppercaseCharValidator } from 'src/app/shared/directives/uppercase-char.directive';
import { LowercaseCharValidator } from 'src/app/shared/directives/lowercase-char.directive';
import { DigitCharValidator } from 'src/app/shared/directives/digit-char.directive';
import { SymbolCharValidator } from 'src/app/shared/directives/symbol-char.directive';
import { EmailTldValidator } from 'src/app/shared/directives/email-tld.directive';

@Component({
  selector: 'app-student-form-reactive',
  templateUrl: './student-form-reactive.component.html',
  styleUrls: ['./student-form-reactive.component.css'],
})
export class StudentFormReactiveComponent implements OnInit {
  studentForm!: FormGroup;
  student = { ...new EmailPassword('', ''), confirmPassword: '' };

  constructor(
    private readonly router: Router,
    private readonly logger: Logger,
    private readonly messageService: MessageService,
    private readonly studentService: StudentService,
    private readonly emailValidator: UniqueEmailValidator
  ) {}

  ngOnInit(): void {
    this.studentForm = new FormGroup(
      {
        email: new FormControl(this.student.email, {
          validators: [
            Validators.required,
            Validators.email,
            Validators.minLength(5),
            // Validators.maxLength(64),
            WhiteSpaceValidator.noWhiteSpace,
            EmailTldValidator.hasTld,
            // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
          ],
          asyncValidators: [
            this.emailValidator.validate.bind(this.emailValidator),
          ],
          updateOn: 'blur',
        }),
        password: new FormControl(
          this.student.password,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(14),
            UppercaseCharValidator.hasUppercaseChar,
            LowercaseCharValidator.hasLowercaseChar,
            DigitCharValidator.hasDigitChar,
            SymbolCharValidator.hasSymbolChar,
            // 31/01/2023
            // TODO: enter ' dsfsdfds@qsdf '
            /*
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-zd$@$!%?&]{6,14}$/
            ),
            */
          ],
          []
        ),
        confirmPassword: new FormControl(
          this.student.confirmPassword,
          [
            Validators.required,
            // Validators.pattern(this.password?.value)
          ],
          []
        ),
      },
      {
        // validators: [identityRevealedValidator],
      }
      // []
    );
  }

  get email() {
    return this.studentForm.get('email')!;
  }

  get password() {
    return this.studentForm.get('password');
  }

  get confirmPassword() {
    return this.studentForm.get('confirmPassword')!;
  }

  add(email: string, password: string): void {
    // 30/01/2023
    // TODO: check for spaces before and after entered string
    email = email.trim();
    password = password.trim();

    if (!email || !password) {
      return;
    }

    this.studentService
      .addStudent({ email, password } as IEmailPassword)
      .subscribe((student) => {
        this.logger.log(`Added student ${JSON.stringify(student)}`);
        this.messageService.add(`Added student ${JSON.stringify(student)}`);

        // STUDENTS.push({ email, password } as IEmailPassword);
        STUDENTS.push(student);


        // this.router.onSameUrlNavigation = 'reload';
        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigateByUrl('students');

        // this.router.routeReuseStrategy.shouldReuseRoute = () => true;
        // this.router.onSameUrlNavigation = 'ignore';

      });
  }
}
