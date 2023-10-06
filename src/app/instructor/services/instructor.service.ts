import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { INSTRUCTORS } from 'src/app/db/cached-instructors';
import { Instructor } from '../../interfaces/instructor';
import { Instructor as InstructorClass } from '../../models/instructor';
import { Logger } from '../../shared/services/logger.service';
import { MessageService } from '../../shared/services/message.service';
import { EntityCrudService } from 'src/app/shared/services/entity-crud.service';
import { IEntityRegisteredService } from 'src/app/shared/services/i-entity-registered';

type MainType = Instructor;

class ModelClassConstructor extends InstructorClass {
  // constructor(firstName: string, lastName: string | undefined) {
  constructor(firstName: string, lastName: string | null) {
    super(firstName, lastName);
  }
}

@Injectable({
  providedIn: 'root',
})
export class InstructorService
  extends EntityCrudService<MainType, ModelClassConstructor>
  implements IEntityRegisteredService
{
  constructor() {
    // TODO: TODO @todo should instructor lastName take `null` XOR `undefined` as potential value type ???
    /**
     * Argument of type 'Instructor[]' is not assignable to parameter of type 'ModelClassConstructor[]'.
  Type 'Instructor' is not assignable to type 'ModelClassConstructor'.
    Types of property 'lastName' are incompatible.
      Type 'string | null' is not assignable to type 'string | undefined'.
        Type 'null' is not assignable to type 'string | undefined'.ts(2345)
(alias) const INSTRUCTORS: Instructor[]
import INSTRUCTORS
     */
    super('instructor', INSTRUCTORS);
  }

  isEntityRegistered(
    firstName: string,
    lastName?: string
  ): Observable<Boolean> {
    firstName = firstName.trim();
    lastName = lastName?.trim();

    return this.getInstructors(0, 9999).pipe(
      map((instructors) => {
        /*
    const isRegistered = this.equipments.includes({ name, price } as Equipment);
    */
        const isRegistered: boolean =
          instructors.filter(
            (instructor) =>
              instructor.firstName.toUpperCase() === firstName.toUpperCase() &&
              instructor.lastName?.toUpperCase() === lastName?.toUpperCase()
          ).length > 0;

        return isRegistered;
      })
    );
  }

  /**
   * GET `Instructor`s from the server
   *
   * @returns an `Observable` array `[]` of `Instructor`s
   */
  getInstructors(pageOffset = 0, entriesPerPage = 5): Observable<Instructor[]> {
    // return
    // const result =
    // return
    return super.getAll(
      // fill cache and remember IDs

      (instructors) =>
        new InstructorClass(instructors.firstName, instructors.lastName),

      pageOffset,
      entriesPerPage
    );

    // return of<Instructor[]>(this.instructors); // never returns the filled array // always returns the empty array
    // return result;
  }

  /*
   * // TODO: InstructorService: getInstructor id=NaN failed: Http failure response for https://localhost:4200/api/instructors/NaN: 404 Not Found
   */
}
