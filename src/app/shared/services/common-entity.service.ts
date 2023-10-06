import { Injectable, inject } from '@angular/core';
import { IEntityService } from './i-entity';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Logger } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export abstract class CommonEntityService implements IEntityService {
  private readonly springBootServerUrl = 'http://localhost:8080';
  protected readonly baseUrlWebApiInMemory = '/api';

  // TODO: test all services
  // TODO: what to test in components?

  protected readonly entityName: string;
  protected readonly titleCasedEntityName: string;
  protected readonly serviceName: string;
  public readonly collectionName: string;

  protected readonly collectionUrlSpring: string;

  private readonly messageService: MessageService;
  protected readonly http: HttpClient;

  protected readonly logger: Logger;

  // constructor(collectionName: string) {
  constructor(entityName: string) {
    this.messageService = inject(MessageService);
    this.http = inject(HttpClient);

    this.entityName = entityName;

    this.titleCasedEntityName = `${entityName
      .substring(0, 1)
      .toLocaleUpperCase()}${entityName.slice(1)}`;

    this.serviceName = `${this.titleCasedEntityName}Service`;

    this.collectionName = `${entityName}${
      entityName.slice(-1) === 's' ? 'es' : 's'
    }`;

    this.collectionUrlSpring = `${this.springBootServerUrl}${this.baseUrlWebApiInMemory}/${this.collectionName}`;

    this.logger = inject(Logger);
  }

  /**
   * Log a `${this.serviceName}` message with the `MessageService`
   * @param message - the `${this.serviceName}` message to log
   */
  public log(message: string) {
    this.messageService.add(`${this.serviceName}: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional `T` value to return as the `Observable` result
   * @returns an empty `T` result to let the app keep running
   */
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      this.logger.error(error);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      // return of(result);
      return of(result as T);
    };
  }
}
