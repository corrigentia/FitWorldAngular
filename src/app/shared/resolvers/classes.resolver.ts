import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Class } from 'src/app/interfaces/class'
import { ClassService } from '../services/class.service'

@Injectable({
  providedIn: 'root'
})
export class ClassesResolver implements Resolve<Class[]> {
  constructor(private readonly classService: ClassService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Class[]> {
    console.log('Called get Classes in resolver...', route)

    return this.classService.getClasses()
  }
}
