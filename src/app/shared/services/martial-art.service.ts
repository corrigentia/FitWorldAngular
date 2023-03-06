import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { MARTIAL_ARTS } from 'src/app/db/cached-martial-arts'
import { MartialArt as MartialArtClass } from 'src/app/models/martial-art'
import { MartialArt } from '../../interfaces/martial-art'
import { Logger } from './logger.service'
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class MartialArtService {
  private readonly martialArts: MartialArt[] = []
  /**
   * :base/:collectionName - URL to web api
   */
  private martialArtsUrl = 'api/martialArts' // URL to web api

  constructor (
    private readonly logger: Logger,
    private readonly messageService: MessageService,
    private readonly http: HttpClient
  ) {}

  /**
   * Log a `MartialArtService` message with the `MessageService`
   * @param message - the `MartialArtService` message to log
   */
  private log (message: string) {
    this.messageService.add(`MartialArtService: ${message}`)
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

  // 30/01/2023
  // TODO: check for spaces before and after entered string
  isMartialArtRegistered (name: string): Observable<Boolean> {
    name = name.trim()

    return this.getMartialArts().pipe(
      map(martialArts => {
        const isRegistered: boolean =
          martialArts.filter(
            martialArt => martialArt.name.toUpperCase() === name.toUpperCase()
          ).length > 0

        return isRegistered
      })
    )
  }

  /**
   * GET `MartialArt`s from the server
   *
   * @returns an `Observable` array `[]` of `MartialArt`s
   */
  getMartialArts (): Observable<MartialArt[]> {
    return this.http.get<MartialArt[]>(this.martialArtsUrl).pipe(
      // tap((_) => {
      tap(martialArts => {
        this.logger.log(`Fetched ${martialArts.length} martial arts`)
        this.log('fetched martial arts')

        this.martialArts.splice(0)
        this.martialArts.push(...martialArts) // fill cache

        MARTIAL_ARTS.splice(0)
        MARTIAL_ARTS.push(...martialArts) // fill cache and remember IDs
        /*
        MARTIAL_ARTS.push(
          ...martialArts.map(
            (martialArt) => new MartialArtClass(martialArt.name)
          )
        ); // fill cache
        */
        this.logger.warn('MARTIAL_ARTS')
        this.logger.warn(MARTIAL_ARTS)

        this.logger.warn('martialArts')
        this.logger.warn(this.martialArts)
      }),
      catchError(this.handleError<MartialArt[]>('getMartialArts', []))
    )
  }

  /**
   * GET `MartialArt` by `id`. Will 404 if `id` not found
   *
   * @param id - the number of the `MartialArt` to retrieve
   * @returns `MartialArt` with the given `id`
   */
  getMartialArt (id: number): Observable<MartialArt> {
    const url = `${this.martialArtsUrl}/${id}`

    return this.http.get<MartialArt>(url).pipe(
      tap(_ => this.log(`fetched martial art id=${id}`)),
      catchError(this.handleError<MartialArt>(`getMartialArt id=${id}`))
    )
  }

  httpOptions = {
    headers: new HttpHeaders({
      // TODO: maybe come back to this as well
      'Content-Type': 'application/json'
    })
  }

  /**
   * `DELETE`: `delete` the `MartialArt` from the server
   *
   * @param martialArtId - the `martialArtId` of the `MartialArt` to delete
   * @returns an `Observable`
   */
  deleteMartialArt (martialArtId: number): Observable<MartialArt> {
    const url = `${this.martialArtsUrl}/${martialArtId}`

    return this.http.delete<MartialArt>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted martial art id=${martialArtId}`)),
      catchError(this.handleError<MartialArt>('deleteMartialArt'))
    )
  }

  /**
   * PUT: update the `MartialArt` on the server
   *
   * @param martialArt - the changed `MartialArt` on the server
   * @returns an `Observable` of the changed `MartialArt` on the server
   */
  updateMartialArt (martialArt: MartialArt): Observable<any> {
    const url = `${this.martialArtsUrl}/${martialArt.id}`

    const body = { ...martialArt } as MartialArt

    this.log(JSON.stringify(body))

    return this.http.put(url, body, this.httpOptions).pipe(
      tap(_ => this.log(`updated martial art id=${martialArt.id}`)),
      catchError(this.handleError<any>('updateMartialArt'))
    )
  }

  /**
   * `POST`: `add` a new `MartialArt` to the server
   *
   * @param martialArt - the new `MartialArt` to create on the server
   * @returns the `Observable<MartialArt>` to the caller
   */
  addMartialArt (martialArt: MartialArt): Observable<MartialArt> {
    const url = 'api/martialArts'

    return this.http.post<MartialArt>(url, martialArt, this.httpOptions).pipe(
      tap((newMartialArt: MartialArt) =>
        this.log(`added martial art w/ id=${newMartialArt.id}`)
      ),
      catchError(this.handleError<MartialArt>('addMartialArt'))
    )
  }

  searchMartialArts (term: string): Observable<MartialArt[]> {
    if (!term.trim()) {
      // if no `search` `term`, `return` empty `MartialArt[]` array
      return of([])
    }

    return this.http
      .get<MartialArt[]>(`${this.martialArtsUrl}?name=${term}`)
      .pipe(
        tap(resultList =>
          resultList.length
            ? this.log(`found martial arts matching '${term}'`)
            : this.log(`no martial arts matching '${term}'`)
        ),
        catchError(this.handleError<MartialArt[]>('searchMartialArts', []))
      )
  }
}
