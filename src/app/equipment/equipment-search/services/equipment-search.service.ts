import { MessageService } from 'src/app/shared/services/message.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Equipment } from 'src/app/interfaces/equipment';
import { IEntityService } from 'src/app/shared/services/i-entity';
import { CommonEntityService as CommonEntityService } from 'src/app/shared/services/common-entity.service';

type MainType = Equipment;

@Injectable({
  providedIn: 'root',
})
export class EquipmentSearchService
  extends CommonEntityService
  implements IEntityService
{
  // override readonly collectionName = 'equipments';

  constructor() {
    super('equipment');
  }

  getAllByName(term: string): Observable<MainType[]> {
    if (!term.trim()) {
      // if no `search` `term`, `return` empty `Equipment[]` array
      return of([]);
    }

    return (
      this.http
        // .get<Equipment[]>(`${this.equipmentsUrlSpring}?name=^${term}$`)
        .get<MainType[]>(`${this.collectionUrlSpring}/find/name/${term}`)
        .pipe(
          tap((resultList) =>
            resultList.length
              ? this.log(`found equipments matching name='${term}'`)
              : this.log(`no equipments matching name='${term}'`)
          ),
          catchError(this.handleError<MainType[]>('searchEquipments', []))
        )
    );
  }

  getAllByPrice(price: number): Observable<MainType[]> {
    return (
      this.http
        // .get<Equipment[]>(`${this.equipmentsUrlSpring}?price=^${price}$`)
        .get<MainType[]>(`${this.collectionUrlSpring}/find/price/${price}`)
        .pipe(
          tap((resultList) =>
            resultList.length
              ? this.log(`found equipments matching price=${price}`)
              : this.log(`no equipments matching price=${price}`)
          ),
          catchError(this.handleError<MainType[]>('searchEquipments', []))
        )
    );
  }

  searchEquipmentsByName(term: string): Observable<MainType[]> {
    if (!term.trim()) {
      // if no `search` `term`, `return` empty `Equipment[]` array
      return of([]);
    }

    return this.http
      .get<MainType[]>(`${this.collectionUrlSpring}/names/${term}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found equipments matching name='${term}'`)
            : this.log(`no equipments matching name='${term}'`)
        ),
        catchError(this.handleError<MainType[]>('searchEquipments', []))
      );
  }

  searchEquipmentsByPrice(price: number): Observable<MainType[]> {
    if (!price) {
      // if no `search` `term`, `return` empty `Equipment[]` array
      return of([]);
    }

    return this.http
      .get<MainType[]>(`${this.collectionUrlSpring}/prices/${price}`)
      .pipe(
        tap((resultList) =>
          resultList.length
            ? this.log(`found equipments matching price=${price}`)
            : this.log(`no equipments matching price=${price}`)
        ),
        catchError(this.handleError<MainType[]>('searchEquipments', []))
      );
  }
}
