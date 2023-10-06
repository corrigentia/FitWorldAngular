import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Instructor } from 'src/app/interfaces/instructor';
import { CommonEntityService } from 'src/app/shared/services/common-entity.service';
import { IEntityService } from 'src/app/shared/services/i-entity';

type MainType = Instructor;

@Injectable({
  providedIn: 'root',
})
export class InstructorSearchService
  extends CommonEntityService
  implements IEntityService
{
  constructor() {
    super('instructor');
  }

  searchInstructorsByName(term: string): Observable<MainType[]> {
    if (!term.trim()) {
      // if no `search` `term`, `return` empty `Instructor[]` array
      return of([]);
    }

    return this.http
      .get<MainType[]>(`${this.collectionUrlSpring}/name/${term}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found instructors matching name~'${term}'`)
            : this.log(`no instructors matching name~'${term}'`)
        ),
        catchError(this.handleError<MainType[]>('searchInstructorsByName', []))
      );
  }

  getAllByFirstName(term: string): Observable<MainType[]> {
    if (!term.trim()) {
      // if no `search` `term`, `return` empty `Instructor[]` array
      return of([]);
    }

    return this.http
      .get<MainType[]>(`${this.collectionUrlSpring}/find/firstName/${term}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found instructors matching firstName='${term}'`)
            : this.log(`no instructors matching firstName='${term}'`)
        ),
        catchError(
          this.handleError<MainType[]>('getInstructorsByFirstName', [])
        )
      );
  }

  searchInstructorsByFirstName(term: string): Observable<MainType[]> {
    if (!term.trim()) {
      // if no `search` `term`, `return` empty `Instructor[]` array
      return of([]);
    }

    return this.http
      .get<MainType[]>(`${this.collectionUrlSpring}/firstNames/${term}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found instructors matching firstName~'${term}'`)
            : this.log(`no instructors matching firstName~'${term}'`)
        ),
        catchError(
          this.handleError<MainType[]>('searchInstructorsByFirstName', [])
        )
      );
  }

  searchInstructorsByFullName(term: string): Observable<MainType[]> {
    if (!term.trim()) {
      // if no `search` `term`, `return` empty `Instructor[]` array
      return of([]);
    }

    return this.http
      .get<MainType[]>(`${this.collectionUrlSpring}/fullName/${term}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found instructors matching fullName~'${term}'`)
            : this.log(`no instructors matching fullName~'${term}'`)
        ),
        catchError(
          this.handleError<MainType[]>('searchInstructorsByFullName', [])
        )
      );
  }

  getAllByLastName(lastName?: string): Observable<MainType[]> {
    console.log('in instructor search service get all by last name: lastName=');
    console.log(lastName);

    const url = `${this.collectionUrlSpring}/find/lastName/${lastName}`;

    return this.http.get<MainType[]>(url).pipe(
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
      catchError(this.handleError<MainType[]>('getInstructorsByLastName', []))
    );
  }

  searchInstructorsByLastName(lastName?: string): Observable<MainType[]> {
    const url =
      lastName === null
        ? `${this.collectionUrlSpring}/lastNames/`
        : `${this.collectionUrlSpring}/lastNames/${lastName}`;

    return this.http.get<MainType[]>(url).pipe(
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
        this.handleError<MainType[]>('searchInstructorsByLastName', [])
      )
    );
  }
}
