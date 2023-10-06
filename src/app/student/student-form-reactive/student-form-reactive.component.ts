import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { STUDENTS } from 'src/app/db/cached-students';
import { IStudentSpring } from 'src/app/interfaces/student-spring';
// import { EmailPassword as IEmailPassword } from 'src/app/interfaces/email-password';
// import { EmailPassword } from 'src/app/models/email-password';
import { StudentSpring as StudentSpringClass } from 'src/app/models/student-spring';
import { DigitCharValidator } from 'src/app/shared/directives/digit-char.directive';
import { LowercaseCharValidator } from 'src/app/shared/directives/lowercase-char.directive';
import { SymbolCharValidator } from 'src/app/shared/directives/symbol-char.directive';
import { UppercaseCharValidator } from 'src/app/shared/directives/uppercase-char.directive';
import { UniqueUsernameValidator } from 'src/app/shared/directives/username.directive';
import { WhiteSpaceValidator } from 'src/app/shared/directives/white-space.directive';
import { Logger } from 'src/app/shared/services/logger.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { StudentService } from 'src/app/student/services/student.service';

class TService extends StudentService {}
type TInterface = IStudentSpring;
class TClass extends StudentSpringClass {
  /*
  constructor(
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ) {
    super(firstName, lastName, username, password);
  }
  */
}

@Component({
  selector: 'app-student-form-reactive',
  templateUrl: './student-form-reactive.component.html',
  styleUrls: ['./student-form-reactive.component.css'],
})
export class StudentFormReactiveComponent implements OnInit {
  studentForm!: FormGroup;
  student = { ...new TClass('', '', '', ''), confirmPassword: '' };

  constructor(
    private readonly router: Router,
    private readonly logger: Logger,
    private readonly messageService: MessageService,
    // private readonly studentService: TService, // .spec threw a hissy
    private readonly studentService: StudentService,
    // private readonly emailValidator: UniqueEmailValidator
    private readonly usernameValidator: UniqueUsernameValidator
  ) {}

  // TODO: fails the spec/test with undefined.pending probably from some validator // ngOnInit seems to fall unde the category of "change" since detectChanges() throws it
  ngOnInit(): void {
    this.studentForm = new FormGroup(
      {
        firstName: new FormControl(this.student.firstName, {
          validators: [
            Validators.required,
            Validators.minLength(2),
            // Validators.maxLength(64),
            WhiteSpaceValidator.noWhiteSpace,
            // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
          ],
          asyncValidators: [
            //
          ],
          updateOn: 'blur',
        }),
        lastName: new FormControl(this.student.lastName, {
          validators: [
            Validators.required,
            Validators.minLength(2),
            // Validators.maxLength(64),
            WhiteSpaceValidator.noWhiteSpace,
            // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
          ],
          asyncValidators: [
            //
          ],
          updateOn: 'blur',
        }),
        // email: new FormControl(this.student.email, {
        username: new FormControl(this.student.username, {
          validators: [
            Validators.required,
            // Validators.email,
            Validators.minLength(2),
            // Validators.maxLength(64),
            WhiteSpaceValidator.noWhiteSpace,
            // EmailTldValidator.hasTld,
            // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
          ],
          asyncValidators: [
            // this.emailValidator.validate.bind(this.emailValidator),
            this.usernameValidator.validate.bind(this.usernameValidator),
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

  /*
  get email() {
    return this.studentForm.get('email')!;
  }
  */

  get firstName() {
    return this.studentForm.get('email')!;
  }

  get lastName() {
    return this.studentForm.get('email')!;
  }

  get username() {
    return this.studentForm.get('email')!;
  }

  get password() {
    return this.studentForm.get('password');
  }

  get confirmPassword() {
    return this.studentForm.get('confirmPassword')!;
  }

  // add(email: string, password: string): void {
  add(
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ): void {
    // 30/01/2023
    // TODO: check for spaces before and after entered string
    // email = email.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    username = username.trim();
    password = password.trim();

    // if (!email || !password) {
    if (!firstName || !username || !password) {
      return;
    }

    // this.studentService
    this.studentService
      // .addStudent({ email, password } as IEmailPassword)
      .addStudent({ firstName, lastName, username, password } as TInterface)
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
