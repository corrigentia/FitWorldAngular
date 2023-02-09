import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailPassword } from 'src/app/interfaces/email-password';
import { StudentIdEmail } from 'src/app/interfaces/student-id-email';
import { StudentIdEmailPassword } from 'src/app/interfaces/student-id-email-password';
// import { Student } from 'src/app/interfaces/student';
// import { StudentWithPassword } from 'src/app/interfaces/student-with-password';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
})
export class StudentDetailComponent implements OnInit {
  // student?: Student;
  // @Input() student?: Student;
  @Input() student?: StudentIdEmailPassword;
  studentConfirmPassword = { ...this.student, confirmPassword: '' };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly studentService: StudentService,
    private readonly location: Location
  ) {}

  goBack() {
    this.location.back();
  }

  save(): void {
    if (this.student) {
      this.studentService
        // TODO: not working yet
        // TODO: look into why I had to change [FromForm] to [FromBody] in the C# API PUT update method
        .updateStudent(this.student)
        .subscribe(() => this.goBack());
    }
  }

  getStudent(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.studentService
      .getStudent(id)
      // TODO: come back to this
      .subscribe((student) =>
        // (this.student = { ...student, password: '' })
        {
          if (student) {
            this.student = { ...student, password: '' };
          }
        }
      );
  }

  ngOnInit(): void {
    this.getStudent();
  }
}
