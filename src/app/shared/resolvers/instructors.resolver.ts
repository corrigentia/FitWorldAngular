import { Injectable } from '@angular/core'
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router'
import { Observable, of } from 'rxjs'
import { Instructor } from 'src/app/interfaces/instructor'
import { InstructorService } from '../services/instructor.service'

@Injectable({
  providedIn: 'root'
})
export class InstructorsResolver implements Resolve<Instructor[]> {
  constructor (private readonly instructorService: InstructorService) {}

  resolve (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Instructor[]> {
    console.log('Called get Instructors in resolver...', route)

    return this.instructorService.getInstructors()
  }
}
