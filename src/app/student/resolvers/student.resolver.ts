import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IStudentSpring } from 'src/app/interfaces/student-spring';
import { StudentService } from '../../student/services/student.service';

@Injectable({
  providedIn: 'root',
})
// export class StudentResolver implements Resolve<StudentIdEmail> {
export class StudentResolver implements Resolve<IStudentSpring> {
  constructor(private readonly studentService: StudentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    // ): Observable<StudentIdEmail> {
  ): Observable<IStudentSpring> {
    const id = parseInt(route.paramMap.get('id')!, 10);

    // console.log('Called get Student in resolver...', route)
    console.log(`Called get Student id=${id} in resolver...`, route);
    // console.log(route.data)

    return this.studentService.getEntity(
      parseInt(route.paramMap.get('id')!, 10)
    );
  }
}
