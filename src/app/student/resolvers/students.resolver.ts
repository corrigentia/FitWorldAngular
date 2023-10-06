import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IStudentSpring } from 'src/app/interfaces/student-spring';
import { StudentService } from '../../student/services/student.service';

@Injectable({
  providedIn: 'root',
})
// export class StudentsResolver implements Resolve<StudentIdEmail[]> {
export class StudentsResolver  {
  constructor(private readonly studentService: StudentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    // ): Observable<StudentIdEmail[]> {
  ): Observable<IStudentSpring[]> {
    console.log('Called get Students in resolver', route);

    return this.studentService.getStudents(0, 99999);
  }
}
