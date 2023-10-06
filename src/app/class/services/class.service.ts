import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CLASSES } from 'src/app/db/cached-classes';
import { Class } from '../../interfaces/class';
import { Class as ClassClass } from '../../models/class';
import { Logger } from '../../shared/services/logger.service';
import { MessageService } from '../../shared/services/message.service';
import { EntityCrudService } from 'src/app/shared/services/entity-crud.service';
import { IEntityRegisteredService } from 'src/app/shared/services/i-entity-registered';

type MainType = Class;

class ModelClassConstructor extends ClassClass {
  constructor(
    martialArtId: number,
    instructorId: number,
    dateTime: Date,
    pricePerHour: number
  ) {
    super(martialArtId, instructorId, dateTime, pricePerHour);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ClassService
  extends EntityCrudService<MainType, ModelClassConstructor>
  implements IEntityRegisteredService
{
  constructor() {
    super('class', CLASSES);
  }

  isEntityRegistered(
    instructorId: number,
    dateTime: Date
  ): Observable<Boolean> {
    return this.getClasses(0, 9999).pipe(
      map((instructors) => {
        /*
    const isRegistered = this.equipments.includes({ name, price } as Equipment);
    */
        const isRegistered: boolean =
          instructors.filter(
            (martialArtClass) =>
              martialArtClass.instructor.id === instructorId &&
              martialArtClass.dateTime.toString().substring(0, 16) ===
                dateTime.toString().substring(0, 16)
          ).length > 0;

        return isRegistered;
      })
    );
  }

  /**
   * GET `Class`es from the server
   *
   * @returns an `Observable` array `[]` of `Class`es
   */
  getClasses(pageOffset = 0, entriesPerPage = 5): Observable<Class[]> {
    return super.getAll(
      (theClass) =>
        new ModelClassConstructor(
          theClass.martialArt.id,
          theClass.instructor.id,
          theClass.dateTime,
          theClass.pricePerHour
        ),
      pageOffset,
      entriesPerPage
    );
  }

  /**
   * PUT: update the `${this.titleCasedEntityName}` on the server
   *
   * @param entity - the changed `${this.titleCasedEntityName}` on the server
   * @returns an `Observable` of the changed `${this.titleCasedEntityName}` on the server
   */
  // updateEntity(entity: TypeInterface & { id: number }): Observable<any> {
  override updateEntity(entity: MainType): Observable<any> {
    const url = `${this.collectionUrlSpring}/${entity.id}

    `;

    const body = {
      martialArtId: entity.martialArt.id,
      instructorId: entity.instructor.id,
      dateTime: entity.dateTime,
      pricePerHour: entity.pricePerHour,
    } as ModelClassConstructor;

    this.log('custom log here');
    this.log(this.updateEntity.name);
    this.log('body:');
    this.log(JSON.stringify(body));

    return this.http.put(url, body, this.httpOptions).pipe(
      tap((_) => this.log(`updated ${this.entityName} id=${entity.id}`)),
      catchError(
        this.handleError<any>(`${this.serviceName}.${this.updateEntity.name}`)
      )
    );
  }

  // TODO: implement search functionality for the 4 features: martialArt, instructor, price & dateTime
  searchClassesByMartialArtId(id: number): Observable<Class[]> {
    return this.http
      .get<Class[]>(`${this.collectionUrlSpring}/find/martialArtId/${id}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found classes matching martialArtId=${id}`)
            : this.log(`no classes matching martialArtId=${id}`)
        ),
        catchError(this.handleError<Class[]>('searchClassesByMartialArtId', []))
      );
  }

  searchClassesByInstructorId(id: number): Observable<Class[]> {
    return this.http
      .get<Class[]>(`${this.collectionUrlSpring}/find/instructorId/${id}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found classes matching instructorId=${id}`)
            : this.log(`no classes matching instructorId=${id}`)
        ),
        catchError(this.handleError<Class[]>('searchClassesByInstructorId', []))
      );
  }

  searchClassesByDateTime(dateTime: Date): Observable<Class[]> {
    console.log('requested dateTime: ');

    console.log(dateTime);

    return (
      this.http
        // .get<Class[]>(`${this.classesUrl}?dateTime=${dateTime.toString().substring(0, 14)}`)
        // .get<Class[]>(`${this.collectionUrlSpring}?dateTime=2023-0`)
        .get<Class[]>(`${this.collectionUrlSpring}/find/dateTime/${dateTime}`)
        .pipe(
          tap((resultList) =>
            resultList.length
              ? this.log(`found classes matching dateTime=${dateTime}`)
              : this.log(`no classes matching dateTime=${dateTime}`)
          ),
          catchError(this.handleError<Class[]>('searchClassesByDateTime', []))
        )
    );
  }

  searchClassesByPrice(price: number): Observable<Class[]> {
    return this.http
      .get<Class[]>(`${this.collectionUrlSpring}/find/pricePerHour/${price}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found classes matching price=${price}`)
            : this.log(`no classes matching price=${price}`)
        ),
        catchError(this.handleError<Class[]>('searchClassesByPrice', []))
      );
  }
}
