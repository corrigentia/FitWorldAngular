import { UserRegistration } from './../../shared/auth/interfaces/user-registration';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStudentSpring } from 'src/app/interfaces/student-spring';
// import { STUDENTS } from 'src/app/db/mock-students';
// import { Student } from 'src/app/interfaces/student';
import { MessageService } from 'src/app/shared/services/message.service';
import { StudentService } from 'src/app/student/services/student.service';
import { SessionService } from '../../shared/session/services/session.service';

// type another = { title: string; value: number };
type TData = IStudentSpring;

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    standalone: false
})
export class StudentsComponent implements OnInit {
  // TODO: mock-students
  // protected students?: Student[];
  // protected students: StudentIdEmail[] = []
  protected students: TData[] = [];

  // selectedStudent?: StudentIdEmail
  selectedStudent?: TData;
  anonymousAdminNotInstructorUserGuard: boolean = false;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _studentService: StudentService,
    private readonly _messageService: MessageService,
    private readonly _http: HttpClient,
    private readonly _session: SessionService
  ) {}

  // onSelect (student: StudentIdEmail): void {
  onSelect(student: TData): void {
    this.selectedStudent = student;
    this._messageService.add(
      `StudentsComponent: Selected student id=${student.id}`
    );
  }

  // delete (studentToDelete: StudentIdEmail): void {
  delete(studentToDelete: TData): void {
    this.students = this.students.filter(
      (student) => student != studentToDelete
    );

    this._studentService.deleteStudent(studentToDelete.id).subscribe();
  }

  // add (email: string, password: string): void {
  add(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): void {
    firstName = firstName.trim();
    lastName = lastName.trim();
    // email = email.trim()
    email = email.trim();
    password = password.trim();

    if (!firstName || !lastName || !email || !password) {
      return;
    }

    this._studentService
      // .addStudent({ email, password } as EmailPassword)
      .addStudent({ firstName, lastName, email, password } as UserRegistration)
      .subscribe((student) => {
        this.students.push(student);
      });
  }

  page = 1;
  entriesPerPage = 5;

  getStudents(): void {
    // this.students = this.studentService.getAll();
    this._studentService
      .getStudents(this.page - 1, this.entriesPerPage)
      .subscribe((students) => (this.students = students));
  }

  ngOnInit(): void {
    // this.students = STUDENTS;
    // this.getStudents();

    this._activatedRoute.data.subscribe(({ students }) => {
      this.students = students;
    });

    /*
    this.http.get<StudentIdEmail[]>('/api/students').subscribe({
      next: (result) => {
        this.students = result;
      },
      error: (error) => console.error(error),
      complete: () => {
        console.info('Should have the students...');
        console.info(this.students);
      },
    });
    */

    this.anonymousAdminNotInstructorUserGuard =
      this._session.isAnonymous ||
      this._session.isAdmin ||
      (!this._session.isInstructor && !this._session.isStudent);
  }
}
