import { UserRegistration } from './../../shared/auth/interfaces/user-registration';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { STUDENTS } from 'src/app/db/cached-students';
import { IStudentSpring } from 'src/app/interfaces/student-spring';
import { StudentSpring as StudentSpringClass } from 'src/app/models/student-spring';
import { Logger } from 'src/app/shared/services/logger.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { StudentService } from 'src/app/student/services/student.service';

type TInterface = IStudentSpring;
type TClass = StudentSpringClass;

@Component({
    selector: 'app-student-form-template',
    templateUrl: './student-form-template.component.html',
    standalone: false
})
export class StudentFormTemplateComponent {
  // student = { ...new EmailPassword('', ''), confirmPassword: '' };
  student = { ...new StudentSpringClass('', '', '', ''), confirmPassword: '' };

  constructor(
    private readonly router: Router,
    private readonly logger: Logger,
    private readonly messageService: MessageService,
    private readonly studentService: StudentService
  ) {}

  // add(email: string, password: string): void {
  add(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): void {
    // 30/01/2023
    // TODO: check for spaces before and after entered string
    // email = email.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    password = password.trim();

    // if (!email || !password) {
    if (!firstName || !email || !password) {
      return;
    }

    this.studentService
      // .addStudent({ email, password } as IEmailPassword)
      .addStudent({ firstName, lastName, email, password } as UserRegistration)
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
