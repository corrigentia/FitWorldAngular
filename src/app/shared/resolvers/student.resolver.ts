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
export class StudentResolver implements Resolve<StudentIdEmail> {
  constructor (private readonly studentService: StudentService) {}

  resolve (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<StudentIdEmail> {
    const id = parseInt(route.paramMap.get('id')!, 10)

    // console.log('Called get Student in resolver...', route)
    console.log(`Called get Student id=${id} in resolver...`, route)
    // console.log(route.data)

    return this.studentService.getStudent(
      parseInt(route.paramMap.get('id')!, 10)
    )
  }
}
