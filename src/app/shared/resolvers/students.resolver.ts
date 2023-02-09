import { Injectable } from '@angular/core'
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router'
import { Observable, of } from 'rxjs'
import { StudentIdEmail } from 'src/app/interfaces/student-id-email'
import { StudentService } from '../services/student.service'

@Injectable({
  providedIn: 'root'
})
export class StudentsResolver implements Resolve<StudentIdEmail[]> {
  constructor (private readonly studentService: StudentService) {}

  resolve (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<StudentIdEmail[]> {
    console.log('Called get Students in resolver', route)

    return this.studentService.getStudents()
  }
}
