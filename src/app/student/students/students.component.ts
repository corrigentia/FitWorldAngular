import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStudentSpring } from 'src/app/interfaces/student-spring';
// import { STUDENTS } from 'src/app/db/mock-students';
// import { Student } from 'src/app/interfaces/student';
import { MessageService } from 'src/app/shared/services/message.service';
import { StudentService } from 'src/app/student/services/student.service';

// type another = { title: string; value: number };
type TData = IStudentSpring;

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  // TODO: mock-students
  // protected students?: Student[];
  // protected students: StudentIdEmail[] = []
  protected students: TData[] = [];

  // selectedStudent?: StudentIdEmail
  selectedStudent?: TData;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly studentService: StudentService,
    private readonly messageService: MessageService,
    private readonly http: HttpClient
  ) {}

  // onSelect (student: StudentIdEmail): void {
  onSelect(student: TData): void {
    this.selectedStudent = student;
    this.messageService.add(
      `StudentsComponent: Selected student id=${student.id}`
    );
  }

  // delete (studentToDelete: StudentIdEmail): void {
  delete(studentToDelete: TData): void {
    this.students = this.students.filter(
      (student) => student != studentToDelete
    );

    this.studentService.deleteStudent(studentToDelete.id).subscribe();
  }

  // add (email: string, password: string): void {
  add(username: string, password: string): void {
    // email = email.trim()
    username = username.trim();
    password = password.trim();

    if (!username || !password) {
      return;
    }

    this.studentService
      // .addStudent({ email, password } as EmailPassword)
      .addStudent({ username, password } as TData)
      .subscribe((student) => {
        this.students.push(student);
      });
  }

  page = 1;
  entriesPerPage = 5;

  getStudents(): void {
    // this.students = this.studentService.getAll();
    this.studentService
      .getStudents(this.page - 1, this.entriesPerPage)
      .subscribe((students) => (this.students = students));
  }

  ngOnInit(): void {
    // this.students = STUDENTS;
    // this.getStudents();

    this.activatedRoute.data.subscribe(({ students }) => {
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
  }
}
