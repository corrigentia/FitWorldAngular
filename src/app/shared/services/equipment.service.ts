import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { EQUIPMENTS } from 'src/app/db/cached-equipments';
import { Equipment } from '../../interfaces/equipment';
import { Equipment as EquipmentClass } from '../../models/equipment';
import { Logger } from './logger.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private readonly equipments: Equipment[] = [];

  /**
   * :base/:collectionName - URL to web api
   */
  private equipmentsUrl = '/api/equipments'; // URL to web api

  constructor(
    private readonly logger: Logger,
    private readonly messageService: MessageService,
    private readonly http: HttpClient
  ) {}

  /**
   * Log a `EquipmentService` message with the `MessageService`
   * @param message - the `EquipmentService` message to log
   */
  private log(message: string) {
    this.messageService.add(`EquipmentService: ${message}`);
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

  isEquipmentRegistered(name: string, price: number): Observable<boolean> {
    name = name.trim();

    return this.getEquipments().pipe(
      map((equipments) => {
        /*
    const isRegistered = this.equipments.includes({ name, price } as Equipment);
    */
        const isRegistered =
          equipments.filter(
            (equipment) =>
              equipment.name.toUpperCase() === name.toUpperCase() &&
              equipment.price === price
          ).length > 0;

        return isRegistered;
      })
    );
  }

  /**
   * GET `Equipment`s from the server
   *
   * @returns an `Observable` array `[]` of `Equipment`s
   */
  getEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.equipmentsUrl).pipe(
      // tap((_) => this.log('fetched equipments')),
      tap((equipments) => {
        this.logger.log(`Fetched ${equipments.length} equipments`);
        this.log('fetched equipments');

        this.equipments.splice(0);
        this.equipments.push(...equipments); // fill cache

        EQUIPMENTS.splice(0);
        EQUIPMENTS.push(
          ...equipments.map(
            (equipment) => new EquipmentClass(equipment.name, equipment.price)
          )
        ); // fill cache
        this.logger.warn('EQUIPMENTS');
        this.logger.warn(EQUIPMENTS);

        this.logger.warn('equipments');
        this.logger.warn(this.equipments);
      }),
      catchError(this.handleError<Equipment[]>('getEquipments', []))
    );

    // return of<Equipment[]>(this.equipments); // never returns the filled array // always returns the empty array
  }

  /**
   * GET `Equipment` by `id`. Will 404 if `id` not found
   *
   * @param id - the number of the `Equipment` to retrieve
   * @returns `Equipment` with the given `id`
   */
  getEquipment(id: number): Observable<Equipment> {
    const url = `${this.equipmentsUrl}/${id}`;

    return this.http.get<Equipment>(url).pipe(
      tap((_) => this.log(`fetched equipment id=${id}`)),
      catchError(this.handleError<Equipment>(`getEquipment id=${id}`))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({
      // TODO: maybe come back to this as well
      'Content-Type': 'application/json',
    }),
  };

  /**
   * `DELETE`: `delete` the `Equipment` from the server
   *
   * @param equipmentId - the `equipmentId` of the `Equipment` to delete
   * @returns an `Observable`
   */
  deleteEquipment(equipmentId: number): Observable<Equipment> {
    const url = `${this.equipmentsUrl}/${equipmentId}`;

    return this.http.delete<Equipment>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted equipment id=${equipmentId}`)),
      catchError(this.handleError<Equipment>('deleteEquipment'))
    );
  }

  /**
   * PUT: update the `Equipment` on the server
   *
   * @param equipment - the changed `Equipment` on the server
   * @returns an `Observable` of the changed `Equipment` on the server
   */
  updateEquipment(equipment: Equipment): Observable<any> {
    const url = `${this.equipmentsUrl}/${equipment.equipmentId}`;

    const body = { ...equipment } as Equipment;

    this.log(JSON.stringify(body));

    return this.http.put(url, body, this.httpOptions).pipe(
      tap((_) => this.log(`updated equipment id=${equipment.equipmentId}`)),
      catchError(this.handleError<any>('updateEquipment'))
    );
  }

  /**
   * `POST`: `add` a new `Equipment` to the server
   *
   * @param equipment - the new `Equipment` to create on the server
   * @returns the `Observable<Equipment>` to the caller
   */
  addEquipment(equipment: Equipment): Observable<Equipment> {
    const url = 'api/equipments';

    return this.http.post<Equipment>(url, equipment, this.httpOptions).pipe(
      tap((newEquipment: Equipment) =>
        this.log(`added equipment w/ id=${newEquipment.equipmentId}`)
      ),
      catchError(this.handleError<Equipment>('addEquipment'))
    );
  }

  getEquipmentsByName(term: string): Observable<Equipment[]> {
    if (!term.trim()) {
      // if no `search` `term`, `return` empty `Equipment[]` array
      return of([]);
    }

    return this.http
      .get<Equipment[]>(`${this.equipmentsUrl}/name/${term}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found equipments matching name='${term}'`)
            : this.log(`no equipments matching name='${term}'`)
        ),
        catchError(this.handleError<Equipment[]>('searchEquipments', []))
      );
  }

  getEquipmentsByPrice(price: number): Observable<Equipment[]> {
    return this.http
      .get<Equipment[]>(`${this.equipmentsUrl}/price/${price}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found equipments matching price=${price}`)
            : this.log(`no equipments matching price=${price}`)
        ),
        catchError(this.handleError<Equipment[]>('searchEquipments', []))
      );
  }
  searchEquipmentsByName(term: string): Observable<Equipment[]> {
    if (!term.trim()) {
      // if no `search` `term`, `return` empty `Equipment[]` array
      return of([]);
    }

    return this.http
      .get<Equipment[]>(`${this.equipmentsUrl}/names/${term}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found equipments matching name='${term}'`)
            : this.log(`no equipments matching name='${term}'`)
        ),
        catchError(this.handleError<Equipment[]>('searchEquipments', []))
      );
  }

  searchEquipmentsByPrice(price: number): Observable<Equipment[]> {
    if (!price) {
      // if no `search` `term`, `return` empty `Equipment[]` array
      return of([]);
    }

    return this.http
      .get<Equipment[]>(`${this.equipmentsUrl}/prices/${price}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found equipments matching price=${price}`)
            : this.log(`no equipments matching price=${price}`)
        ),
        catchError(this.handleError<Equipment[]>('searchEquipments', []))
      );
  }
}
