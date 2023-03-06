import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { CLASSES } from 'src/app/db/cached-classes'
import { Class } from '../../interfaces/class'
import { Class as ClassClass } from '../../models/class'
import { Logger } from './logger.service'
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private readonly classes: Class[] = []

  /**
   * :base/:collectionName - URL to web api
   */
  private classesUrl = '/api/classes' // URL to web api

  constructor (
    private readonly logger: Logger,
    private readonly messageService: MessageService,
    private readonly http: HttpClient
  ) {}

  /**
   * Log a `ClassService` message with the `MessageService`
   * @param message - the `ClassService` message to log
   */
  private log (message: string) {
    this.messageService.add(`ClassService: ${message}`)
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional `T` value to return as the `Observable` result
   * @returns an empty `T` result to let the app keep running
   */
  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error) // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      // return of(result);
      return of(result as T)
    }
  }

  isClassRegistered (instructorId: number, dateTime: Date): Observable<Boolean> {
    return this.getClasses().pipe(
      map(instructors => {
        /*
    const isRegistered = this.equipments.includes({ name, price } as Equipment);
    */
        const isRegistered: boolean =
          instructors.filter(
            martialArtClass =>
              martialArtClass.instructorId === instructorId &&
              martialArtClass.dateTime.toString().substring(0, 16) ===
                dateTime.toString().substring(0, 16)
          ).length > 0

        return isRegistered
      })
    )
  }

  /**
   * GET `Class`s from the server
   *
   * @returns an `Observable` array `[]` of `Class`s
   */
  getClasses (): Observable<Class[]> {
    return this.http.get<Class[]>(this.classesUrl).pipe(
      // tap((_) => {
      tap(classes => {
        this.logger.log(`Fetched ${classes.length} classes`)
        this.log('fetched classes')

        this.classes.splice(0)
        this.classes.push(...classes) // fill cache

        CLASSES.splice(0)
        CLASSES.push(
          ...classes.map(
            theClass =>
              new ClassClass(
                theClass.martialArtId,
                theClass.instructorId,
                theClass.dateTime,
                theClass.pricePerHour
              )
          )
        ) // fill cache
        this.logger.warn('CLASSES')
        this.logger.warn(CLASSES)

        this.logger.warn('classes')
        this.logger.warn(this.classes)
      }),
      catchError(this.handleError<Class[]>('getClasses', []))
    )
  }

  /**
   * GET `Class` by `id`. Will 404 if `id` not found
   *
   * @param id - the number of the `Class` to retrieve
   * @returns `Class` with the given `id`
   */
  getClass (id: number): Observable<Class> {
    const url = `${this.classesUrl}/${id}`

    return this.http.get<Class>(url).pipe(
      tap(_ => this.log(`fetched class id=${id}`)),
      catchError(this.handleError<Class>(`getClass id=${id}`))
    )
  }

  httpOptions = {
    headers: new HttpHeaders({
      // TODO: maybe come back to this as well
      'Content-Type': 'application/json'
    })
  }

  /**
   * `DELETE`: `delete` the `Class` from the server
   *
   * @param id - the `id` of the `Class` to delete
   * @returns an `Observable`
   */
  deleteClass (id: number): Observable<Class> {
    const url = `${this.classesUrl}/${id}`

    return this.http.delete<Class>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted class id=${id}`)),
      catchError(this.handleError<Class>('deleteClass'))
    )
  }

  /**
   * PUT: update the `Class` on the server
   *
   * @param class - the changed `Class` on the server
   * @returns an `Observable` of the changed `Class` on the server
   */
  updateClass (classToUpdate: Class): Observable<any> {
    const url = `${this.classesUrl}/${classToUpdate.id}`

    const body = { ...classToUpdate } as Class

    this.log(JSON.stringify(body))

    return this.http.put(url, body, this.httpOptions).pipe(
      tap(_ => this.log(`updated class id=${classToUpdate.id}`)),
      catchError(this.handleError<any>('updateClass'))
    )
  }

  /**
   * `POST`: `add` a new `Class` to the server
   *
   * @param class - the new `Class` to create on the server
   * @returns the `Observable<Class>` to the caller
   */
  addClass (classToAdd: Class): Observable<Class> {
    const url = 'api/classes'

    return this.http.post<Class>(url, classToAdd, this.httpOptions).pipe(
      tap((newClass: Class) => this.log(`added class w/ id=${newClass.id}`)),
      catchError(this.handleError<Class>('addClass'))
    )
  }

  // TODO: implement search functionality for the 4 features: martialArt, instructor, price & dateTime
  searchClassesByMartialArtId (id: number): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.classesUrl}?martialArtId=^${id}$`).pipe(
      tap(resultList =>
        resultList.length
          ? this.log(`found classes matching martialArtId=${id}`)
          : this.log(`no classes matching martialArtId=${id}`)
      ),
      catchError(this.handleError<Class[]>('searchClassesByMartialArtId', []))
    )
  }

  searchClassesByInstructorId (id: number): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.classesUrl}?instructorId=^${id}$`).pipe(
      tap(resultList =>
        resultList.length
          ? this.log(`found classes matching instructorId=${id}`)
          : this.log(`no classes matching instructorId=${id}`)
      ),
      catchError(this.handleError<Class[]>('searchClassesByInstructorId', []))
    )
  }

  searchClassesByDateTime (dateTime: Date): Observable<Class[]> {
    return this.http
      .get<Class[]>(`${this.classesUrl}?dateTime=${dateTime.toString().substring(0, 16)}`)
      .pipe(
        tap(resultList =>
          resultList.length
            ? this.log(`found classes matching dateTime=${dateTime}`)
            : this.log(`no classes matching dateTime=${dateTime}`)
        ),
        catchError(this.handleError<Class[]>('searchClassesByDateTime', []))
      )
  }

  searchClassesByPrice (price: number): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.classesUrl}?pricePerHour=^${price}$`).pipe(
      tap(resultList =>
        resultList.length
          ? this.log(`found classes matching price=${price}`)
          : this.log(`no classes matching price=${price}`)
      ),
      catchError(this.handleError<Class[]>('searchClassesByPrice', []))
    )
  }
}
