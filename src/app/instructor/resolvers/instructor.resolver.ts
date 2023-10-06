import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Instructor } from 'src/app/interfaces/instructor';
import { InstructorService } from '../services/instructor.service';

@Injectable({
  providedIn: 'root',
})
export class InstructorResolver  {
  constructor(private readonly instructorService: InstructorService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Instructor> {
    const id = parseInt(route.paramMap.get('id')!, 10);

    // console.log('Called get Instructor in resolver...', route)
    console.log(`Called get Instructor id=${id} in resolver...`, route);
    // console.log(route.data)

    return this.instructorService.getEntity(
      parseInt(route.paramMap.get('id')!, 10)
    );
  }
}
