import { Component, OnInit } from '@angular/core';
import { IStudentSpring } from '../interfaces/student-spring';
import { StudentService } from '../student/services/student.service';
// import { Student } from '../interfaces/student';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: false
})
export class DashboardComponent implements OnInit {
  // students: StudentIdEmail[] = [];
  students: IStudentSpring[] = [];

  /**
   *
   */
  constructor(private readonly studentService: StudentService) {
    // super();
  }

  getAll(): void {
    this.studentService
      .getStudents(0, 7)
      .subscribe((students) => (this.students = students.slice(1, 5)));
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAll();
  }
}
