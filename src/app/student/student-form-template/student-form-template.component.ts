import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmailPassword } from 'src/app/models/email-password';
import { EmailPassword as IEmailPassword } from 'src/app/interfaces/email-password';
import { Logger } from 'src/app/shared/services/logger.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { STUDENTS } from 'src/app/db/cached-students';

@Component({
  selector: 'app-student-form-template',
  templateUrl: './student-form-template.component.html',
  styleUrls: ['./student-form-template.component.css'],
})
export class StudentFormTemplateComponent {
  student = { ...new EmailPassword('', ''), confirmPassword: '' };

  constructor(
    private readonly router: Router,
    private readonly logger: Logger,
    private readonly messageService: MessageService,
    private readonly studentService: StudentService
  ) {}

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
