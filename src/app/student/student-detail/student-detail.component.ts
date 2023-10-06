import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStudentSpring } from 'src/app/interfaces/student-spring';
import { AuthService } from 'src/app/shared/auth/services/auth.service';
// import { Student } from 'src/app/interfaces/student';
// import { StudentWithPassword } from 'src/app/interfaces/student-with-password';
import { StudentService } from 'src/app/student/services/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
})
export class StudentDetailComponent implements OnInit {
  // student?: Student;
  // @Input() student?: Student;
  // @Input() student?: StudentIdEmailPassword;
  @Input() student?: IStudentSpring;
  studentConfirmPassword = { ...this.student, confirmPassword: '' };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly studentService: StudentService,
    private readonly location: Location,
    private readonly authService: AuthService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.authService.getUserProfile(id).subscribe((student) => {
      console.log('student:', student);

      if (student) {
        this.student = {
          ...student,
          password: '',
        };
      }
    });
  }

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

  getEntity(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.studentService
      .getEntity(id)
      // TODO: come back to this
      .subscribe((student) =>
        // (this.student = { ...student, password: '' })
        {
          console.log('student: ', student);

          if (student) {
            this.student = { ...student, password: '' };
          }
        }
      );
  }

  ngOnInit(): void {
    this.getEntity();
  }
}
