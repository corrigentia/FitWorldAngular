import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { INSTRUCTORS } from 'src/app/db/cached-instructors';
import { Instructor } from '../../interfaces/instructor';
import { Instructor as InstructorClass } from '../../models/instructor';
import { Logger } from './logger.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private instructors: Instructor[] = [];

  /**
   * :base/:collectionName - URL to web api
   */
  private instructorsUrl = '/api/instructors'; // URL to web api

  constructor(
    private readonly logger: Logger,
    private readonly messageService: MessageService,
    private readonly http: HttpClient
  ) {}

  /**
   * Log a `InstructorService` message with the `MessageService`
   * @param message - the `InstructorService` message to log
   */
  private log(message: string) {
    this.messageService.add(`InstructorService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional `T` value to return as the `Observable` result
   * @returns an empty `T` result to let the app keep running
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      // return of(result);
      return of(result as T);
    };
  }

  isInstructorRegistered(
    firstName: string,
    lastName?: string
  ): Observable<Boolean> {
    firstName = firstName.trim();
    lastName = lastName?.trim();

    return this.getInstructors().pipe(
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
  getInstructors(): Observable<Instructor[]> {
    // return
    // const result =
    // return
    return this.http.get<Instructor[]>(this.instructorsUrl).pipe(
      // tap((_) => {
      tap((instructors) => {
        this.logger.log(`Fetched ${instructors.length} instructors`);
        this.log('fetched instructors');

        this.instructors.splice(0);
        this.instructors.push(...instructors); // fill cache

        INSTRUCTORS.splice(0);
        INSTRUCTORS.push(...instructors); // fill cache and remember IDs
        /*
        INSTRUCTORS.push(
          ...instructors.map(
            (instructors) =>
              new InstructorClass(instructors.firstName, instructors.lastName)
          )
        ); // fill cache
        */
        this.logger.warn('INSTRUCTORS');
        this.logger.warn(INSTRUCTORS);

        this.logger.warn('instructors');
        this.logger.warn(this.instructors);
      }),
      catchError(this.handleError<Instructor[]>('getInstructors', []))
    );

    // return of<Instructor[]>(this.instructors); // never returns the filled array // always returns the empty array
    // return result;
  }

  /*
   * // TODO: InstructorService: getInstructor id=NaN failed: Http failure response for https://localhost:4200/api/instructors/NaN: 404 Not Found
   */
  /**
   * GET `Instructor` by `id`. Will 404 if `id` not found
   *
   * @param id - the number of the `Instructor` to retrieve
   * @returns `Instructor` with the given `id`
   */
  getInstructor(id: number): Observable<Instructor> {
    const url = `${this.instructorsUrl}/${id}`;

    return this.http.get<Instructor>(url).pipe(
      tap((_) => this.log(`fetched instructor id=${id}`)),
      catchError(this.handleError<Instructor>(`getInstructor id=${id}`))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({
      // TODO: maybe come back to this as well
      'Content-Type': 'application/json',
    }),
  };

  /**
   * `DELETE`: `delete` the `Instructor` from the server
   *
   * @param instructorId - the `instructorId` of the `Instructor` to delete
   * @returns an `Observable`
   */
  deleteInstructor(instructorId: number): Observable<Instructor> {
    const url = `${this.instructorsUrl}/${instructorId}`;

    return this.http.delete<Instructor>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted instructor id=${instructorId}`)),
      catchError(this.handleError<Instructor>('deleteInstructor'))
    );
  }

  /**
   * PUT: update the `Instructor` on the server
   *
   * @param instructor - the changed `Instructor` on the server
   * @returns an `Observable` of the changed `Instructor` on the server
   */
  updateInstructor(instructor: Instructor): Observable<any> {
    const url = `${this.instructorsUrl}/${instructor.instructorId}`;

    const body = { ...instructor } as Instructor;

    this.log(JSON.stringify(body));

    return this.http.put(url, body, this.httpOptions).pipe(
      tap((_) => this.log(`updated instructor id=${instructor.instructorId}`)),
      catchError(this.handleError<any>('updateInstructor'))
    );
  }

  /**
   * `POST`: `add` a new `Instructor` to the server
   *
   * @param instructor - the new `Instructor` to create on the server
   * @returns the `Observable<Instructor>` to the caller
   */
  addInstructor(instructor: Instructor): Observable<Instructor> {
    const url = 'api/instructors';

    return this.http.post<Instructor>(url, instructor, this.httpOptions).pipe(
      tap((newInstructor: Instructor) =>
        this.log(`added instructor w/ id=${newInstructor.instructorId}`)
      ),
      catchError(this.handleError<Instructor>('addInstructor'))
    );
  }

  searchInstructorsByName(term: string): Observable<Instructor[]> {
    if (!term.trim()) {
      // if no `search` `term`, `return` empty `Instructor[]` array
      return of([]);
    }

    return this.http
      .get<Instructor[]>(`${this.instructorsUrl}/name/${term}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found instructors matching name~'${term}'`)
            : this.log(`no instructors matching name~'${term}'`)
        ),
        catchError(
          this.handleError<Instructor[]>('searchInstructorsByName', [])
        )
      );
  }

  getInstructorsByFirstName(term: string): Observable<Instructor[]> {
    if (!term.trim()) {
      // if no `search` `term`, `return` empty `Instructor[]` array
      return of([]);
    }

    return this.http
      .get<Instructor[]>(`${this.instructorsUrl}/firstName/${term}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found instructors matching firstName='${term}'`)
            : this.log(`no instructors matching firstName='${term}'`)
        ),
        catchError(
          this.handleError<Instructor[]>('getInstructorsByFirstName', [])
        )
      );
  }

  searchInstructorsByFirstName(term: string): Observable<Instructor[]> {
    if (!term.trim()) {
      // if no `search` `term`, `return` empty `Instructor[]` array
      return of([]);
    }

    return this.http
      .get<Instructor[]>(`${this.instructorsUrl}/firstNames/${term}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found instructors matching firstName~'${term}'`)
            : this.log(`no instructors matching firstName~'${term}'`)
        ),
        catchError(
          this.handleError<Instructor[]>('searchInstructorsByFirstName', [])
        )
      );
  }

  searchInstructorsByFullName(term: string): Observable<Instructor[]> {
    if (!term.trim()) {
      // if no `search` `term`, `return` empty `Instructor[]` array
      return of([]);
    }

    return this.http
      .get<Instructor[]>(`${this.instructorsUrl}/fullName/${term}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found instructors matching fullName~'${term}'`)
            : this.log(`no instructors matching fullName~'${term}'`)
        ),
        catchError(
          this.handleError<Instructor[]>('searchInstructorsByFullName', [])
        )
      );
  }

  getInstructorsByLastName(lastName?: string): Observable<Instructor[]> {
    const url =
      lastName === null
        ? `${this.instructorsUrl}/lastName/`
        : `${this.instructorsUrl}/lastName/${lastName}`;

    return this.http.get<Instructor[]>(url).pipe(
      tap((resultList) =>
        resultList.length
          ? this.log(
              'found instructors matching lastName='.concat(
                lastName === null ? `${lastName}` : `'${lastName}'`
              )
            )
          : this.log(
              'no instructors matching lastName='.concat(
                lastName === null ? `${lastName}` : `'${lastName}'`
              )
            )
      ),
      catchError(this.handleError<Instructor[]>('getInstructorsByLastName', []))
    );
  }

  searchInstructorsByLastName(lastName?: string): Observable<Instructor[]> {
    const url =
      lastName === null
        ? `${this.instructorsUrl}/lastNames/`
        : `${this.instructorsUrl}/lastNames/${lastName}`;

    return this.http.get<Instructor[]>(url).pipe(
      tap((resultList) =>
        resultList.length
          ? this.log(
              'found instructors matching lastName='.concat(
                lastName === null ? `${lastName}` : `'${lastName}'`
              )
            )
          : this.log(
              'no instructors matching lastName='.concat(
                lastName === null ? `${lastName}` : `'${lastName}'`
              )
            )
      ),
      catchError(
        this.handleError<Instructor[]>('searchInstructorsByLastName', [])
      )
    );
  }
}
