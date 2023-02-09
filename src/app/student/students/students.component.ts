import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { EmailPassword } from 'src/app/interfaces/email-password'
import { StudentIdEmail } from 'src/app/interfaces/student-id-email'
// import { STUDENTS } from 'src/app/db/mock-students';
// import { Student } from 'src/app/interfaces/student';
import { MessageService } from 'src/app/shared/services/message.service'
import { StudentService } from 'src/app/shared/services/student.service'

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  // TODO: mock-students
  // protected students?: Student[];
  protected students: StudentIdEmail[] = []

  selectedStudent?: StudentIdEmail

  constructor (
    private readonly activatedRoute: ActivatedRoute,
    private readonly studentService: StudentService,
    private readonly messageService: MessageService,
    private readonly http: HttpClient
  ) {}

  onSelect (student: StudentIdEmail): void {
    this.selectedStudent = student
    this.messageService.add(
      `StudentsComponent: Selected student id=${student.studentId}`
    )
  }

  delete (studentToDelete: StudentIdEmail): void {
    this.students = this.students.filter(student => student != studentToDelete)

    this.studentService.deleteStudent(studentToDelete.studentId).subscribe()
  }

  add (email: string, password: string): void {
    email = email.trim()
    password = password.trim()

    if (!email || !password) {
      return
    }

    this.studentService
      .addStudent({ email, password } as EmailPassword)
      .subscribe(student => {
        this.students.push(student)
      })
  }

  getStudents (): void {
    // this.students = this.studentService.getStudents();
    this.studentService
      .getStudents()
      .subscribe(students => (this.students = students))
  }

  ngOnInit (): void {
    // this.students = STUDENTS;
    // this.getStudents();

    this.activatedRoute.data.subscribe(({ students }) => {
      this.students = students
    })

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
