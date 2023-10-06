import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MARTIAL_ARTS } from 'src/app/db/cached-martial-arts';
import { MartialArt } from '../../interfaces/martial-art';
import { MartialArt as MartialArtClass } from '../../models/martial-art';
import { Logger } from '../../shared/services/logger.service';
import { MessageService } from '../../shared/services/message.service';
import { EntityCrudService } from 'src/app/shared/services/entity-crud.service';
import { IEntityRegisteredService } from 'src/app/shared/services/i-entity-registered';

type MainType = MartialArt;

class ModelClassConstructor extends MartialArtClass {
  constructor(name: string) {
    super(name);
  }
}

@Injectable({
  providedIn: 'root',
})
export class MartialArtService
  extends EntityCrudService<MainType, ModelClassConstructor>
  implements IEntityRegisteredService
{
  constructor() {
    super('martialArt', MARTIAL_ARTS);
  }

  // 30/01/2023
  // TODO: check for spaces before and after entered string
  isEntityRegistered(name: string): Observable<Boolean> {
    name = name.trim();

    return this.getMartialArts(0, 9999).pipe(
      map((martialArts) => {
        const isRegistered: boolean =
          martialArts.filter(
            (martialArt) => martialArt.name.toUpperCase() === name.toUpperCase()
          ).length > 0;

        return isRegistered;
      })
    );
  }

  /**
   * GET `MartialArt`s from the server
   *
   * @returns an `Observable` array `[]` of `MartialArt`s
   */
  getMartialArts(pageOffset = 0, entriesPerPage = 5): Observable<MartialArt[]> {
    // const url = `${this.martialArtsUrlSpring}/all`;

    // return this.http.get<MartialArt[]>(url).pipe(
    // tap((_) => {
    // ... })

    // fill cache and remember IDs
    /*
                MARTIAL_ARTS.push(
                  ...martialArts.map(
                    (martialArt) => new MartialArtClass(martialArt.name)
                  )
                ); // fill cache
                */

    return super.getAll(
      (martialArt) => new MartialArtClass(martialArt.name),
      pageOffset,
      entriesPerPage
    );
  }

  searchMartialArts(term: string): Observable<MartialArt[]> {
    if (!term.trim()) {
      // if no `search` `term`, `return` empty `MartialArt[]` array
      return of([]);
    }

    return this.http
      .get<MartialArt[]>(`${this.collectionUrlSpring}?name=${term}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found martial arts matching '${term}'`)
            : this.log(`no martial arts matching '${term}'`)
        ),
        catchError(this.handleError<MartialArt[]>('searchMartialArts', []))
      );
  }
}
