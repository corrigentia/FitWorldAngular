// import { Injectable } from '@angular/core';
import { CommonEntityService } from './common-entity.service';
import { IEntityService } from './i-entity';
import { Observable, catchError, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

// type ModelClassConstructor = EquipmentClass['constructor'];
// type ModelClassConstructor = EquipmentClass;

/*
@Injectable({
  providedIn: 'root',
})
*/
export abstract class EntityCrudService<
    TypeInterface extends { id: number },
    ModelClassConstructor
  >
  extends CommonEntityService
  implements IEntityService
{
  protected readonly collectionStore: TypeInterface[] = [];

  protected CACHED_COLLECTION;

  /**
   * :base/:collectionName - URL to web api
   */
  // private equipmentsUrl = '/api/equipments' // URL to web api
  private collectionUrlWebApiInMemory = `${this.baseUrlWebApiInMemory}/${this.collectionName}`; // URL to web api

  private readonly collectionUrl;

  // constructor(collectionName: string) {
  constructor(entityName: string, CACHED_COLLECTION: TypeInterface[]) {
    super(entityName);
    // super(collectionName);

    /*
    if (asdf) {
      console.log('exists in memory web api amodule');
    }
    */

    /*
    const source = interval(3000);

    source.subscribe(() => {
      this.http
        .get('http://localhost:8080/swagger-ui/index.html', {
          observe: 'response',
        })
        .pipe(first())
        .subscribe((response) => {
          this.springRunning = response.status === 200;
        });
    });
    */

    const springRunning: boolean = true;

    this.collectionUrl = springRunning
      ? this.collectionUrlSpring
      : this.collectionUrlWebApiInMemory;

    this.CACHED_COLLECTION = CACHED_COLLECTION;
  }

  /**
   * GET `${this.titleCasedEntityName}`s from the server
   *
   * @returns an `Observable` array `[]` of `${this.titleCasedEntityName}`s
   */
  getAll(
    mapCollectionElement: (
      collectionElement: TypeInterface
    ) => ModelClassConstructor,

    /*
    fillCache: (entireCollection: TypeInterface[]) => number,
    */

    pageOffset = 0,
    entriesPerPage = 5
  ): Observable<TypeInterface[]> {
    const url = `${this.collectionUrlSpring}`;

    return this.http
      .get<TypeInterface[]>(
        `${this.collectionUrl}?page=${pageOffset}&size=${entriesPerPage}`
      )
      .pipe(
        // return this.http.get<Equipment[]>(url).pipe(
        // tap((_) => this.log('fetched equipments')),
        tap((allCollection) => {
          this.logger.log(
            `Fetched ${allCollection.length} ${this.collectionName}`
          );

          this.log(`fetched ${this.collectionName}`);

          this.collectionStore.splice(0);
          this.collectionStore.push(...allCollection); // fill cache

          // this.collectionStore.sort((left, right) => left.id - right.id);

          //#region ShorterLambda
          this.CACHED_COLLECTION.splice(0);
          this.CACHED_COLLECTION = allCollection;
          this.CACHED_COLLECTION
            .push
            /*
            ...allCollection.map((collectionElement) =>
              mapCollectionElement(collectionElement)
            )
            */
            (); // fill cache
          this.logger.warn(
            `${
              this.serviceName
            }.${this.collectionName.toUpperCase()}.CACHED_COLLECTION :`
          );
          this.logger.warn(this.CACHED_COLLECTION);
          //#endregion

          //#region LongerLambda
          /*
          this.CACHED_COLLECTION.splice(0);
          fillCache(allCollection); // fill cache
          this.logger.warn(
            `${
              this.serviceName
            }.${this.collectionName.toUpperCase()}.CACHED_COLLECTION :`
          );
          this.logger.warn(this.CACHED_COLLECTION);
          */
          //#endregion

          this.logger.warn(`${this.collectionName}`);
          this.logger.warn(this.collectionStore);
        }),
        catchError(
          this.handleError<TypeInterface[]>(
            `${this.serviceName}.${this.getAll.name}`,
            []
          )
        )
      );

    // return of<Equipment[]>(this.equipments); // never returns the filled array // always returns the empty array
  }

  /**
   * GET `${this.titleCasedEntityName}` by `id`. Will 404 if `id` not found
   *
   * @param id - the number of the `${this.titleCasedEntityName}` to retrieve
   * @returns `${this.titleCasedEntityName}` with the given `id`
   */
  getEntity(id: number): Observable<TypeInterface> {
    const url = `${this.collectionUrlSpring}/${id}`;

    return this.http.get<TypeInterface>(url).pipe(
      tap((entity) => {
        this.logger.log(`Fetched ${this.entityName} ${JSON.stringify(entity)}`);

        this.log(`fetched ${this.entityName} id=${id}`);
      }),
      catchError(
        this.handleError<TypeInterface>(
          `${this.serviceName}.${this.getEntity.name} id=${id}`
        )
      )
    );
  }

  protected readonly httpOptions = {
    headers: new HttpHeaders({
      // TODO: maybe come back to this as well
      'Content-Type': 'application/json',
    }),
  };

  /**
   * `DELETE`: `delete` the `TypeInterface` from the server
   *
   * @param id - the `id` of the `TypeInterface` to delete
   * @returns an `Observable`
   */
  deleteEntity(id: number): Observable<TypeInterface> {
    const url = `${this.collectionUrlSpring}/${id}`;

    return this.http.delete<TypeInterface>(url, this.httpOptions).pipe(
      tap((entity) => {
        this.logger.log(
          `Deleted ${this.entityName} id=${id} ${JSON.stringify(entity)}`
        );

        this.log(`deleted ${this.entityName} id=${id}`);
      }),
      catchError(
        this.handleError<TypeInterface>(
          `${this.serviceName}.${this.deleteEntity.name}`
        )
      )
    );
  }

  /**
   * PUT: update the `${this.titleCasedEntityName}` on the server
   *
   * @param entity - the changed `${this.titleCasedEntityName}` on the server
   * @returns an `Observable` of the changed `${this.titleCasedEntityName}` on the server
   */
  // updateEntity(entity: TypeInterface & { id: number }): Observable<any> {
  updateEntity(entity: TypeInterface): Observable<any> {
    const url = `${this.collectionUrlSpring}/${entity.id}

    `;

    const body = { ...entity } as TypeInterface;

    this.log(this.updateEntity.name + ' body: ' + JSON.stringify(body));

    this.log(JSON.stringify(body));

    return this.http.put(url, body, this.httpOptions).pipe(
      tap((_) => this.log(`updated ${this.entityName} id=${entity.id}`)),
      catchError(
        this.handleError<any>(`${this.serviceName}.${this.updateEntity.name}`)
      )
    );
  }

  /**
   * `POST`: `add` a new `${this.titleCasedEntityName}` to the server
   *
   * @param entity - the new `${this.titleCasedEntityName}` to create on the server
   * @returns the `Observable<${this.titleCasedEntityName}>` to the caller
   */
  addEntity(
    // entity: TypeInterface & { id: number }
    entity: ModelClassConstructor
    // ): Observable<TypeInterface & { id: number }> {
  ): Observable<TypeInterface> {
    // const url = 'api/equipments';
    const url = `${this.collectionUrlSpring}`;

    console.log('inside entity crud service');
    console.log('trying to add new entry to db');
    console.log('entity : ', entity);

    return (
      this.http
        // .post<TypeInterface & { id: number }>(url, equipment, this.httpOptions)
        .post<TypeInterface>(url, entity, this.httpOptions)
        .pipe(
          // tap((newEquipment: TypeInterface & { id: number }) =>
          tap((newEntity: TypeInterface) =>
            this.log(`added ${this.entityName} w/ id=${newEntity.id}`)
          ),
          catchError(
            // this.handleError<TypeInterface & { id: number }>(
            this.handleError<TypeInterface>(
              `${this.constructor.name}.${self}.${this.addEntity.name}`
            )
          )
        )
    );
  }
}
