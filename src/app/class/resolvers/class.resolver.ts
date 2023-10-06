import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Class } from 'src/app/interfaces/class';
import { ClassService } from '../services/class.service';

@Injectable({
  providedIn: 'root',
})
export class ClassResolver  {
  constructor(private readonly classService: ClassService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Class> {
    const id = parseInt(route.paramMap.get('id')!, 10);

    // console.log('Called get Class in resolver...', route)
    console.log(`Called get Class id=${id} in resolver...`, route);
    // console.log(route.data)

    return this.classService.getEntity(parseInt(route.paramMap.get('id')!, 10));
  }
}
