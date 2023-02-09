import { Component, OnInit } from '@angular/core';
import { StudentIdEmail } from '../interfaces/student-id-email';
import { StudentService } from '../shared/services/student.service';
// import { Student } from '../interfaces/student';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  students: StudentIdEmail[] = [];

  /**
   *
   */
  constructor(private readonly studentService: StudentService) {
    // super();
  }

  getStudents(): void {
    this.studentService
      .getStudents()
      .subscribe((students) => (this.students = students.slice(1, 5)));
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getStudents();
  }
}
