// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable, interval, of } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';
import { EQUIPMENTS } from 'src/app/db/cached-equipments';
import { Equipment } from '../../interfaces/equipment';
import { Equipment as EquipmentClass } from '../../models/equipment';
import { Logger } from '../../shared/services/logger.service';
import { MessageService } from '../../shared/services/message.service';
import { CommonEntityService } from 'src/app/shared/services/common-entity.service';
import { IEntityService } from 'src/app/shared/services/i-entity';
import { EntityCrudService } from 'src/app/shared/services/entity-crud.service';
import { IEntityRegisteredService } from 'src/app/shared/services/i-entity-registered';

type MainType = Equipment;

class ModelClassConstructor extends EquipmentClass {
  constructor(name: string, price: number) {
    super(name, price);
  }
}

@Injectable({
  providedIn: 'root',
})
export class EquipmentService
  extends EntityCrudService<MainType, ModelClassConstructor>
  implements IEntityRegisteredService
{
  // override readonly collectionName = 'equipments';

  constructor() {
    // private readonly http: HttpClient // @Optional() private readonly asdf?: HttpClientInMemoryWebApiModule
    super('equipment', EQUIPMENTS);
  }

  isEntityRegistered(name: string, price: number): Observable<boolean> {
    name = name.trim();

    return this.getEquipments(0, 9999).pipe(
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
  getEquipments(pageOffset = 0, entriesPerPage = 5): Observable<MainType[]> {
    return super.getAll(
      (equipment: MainType) =>
        new ModelClassConstructor(equipment.name, equipment.price),

      /*
      (allCollection: MainType[]) =>
        this.CACHED_COLLECTION.push(
          ...allCollection.map(
            (equipment) =>
              new ModelClassConstructor(equipment.name, equipment.price)

            /*
              ({
                name: equipment.name,
                price: equipment.price,
              } as ModelClassConstructor)
              */
      /*
          )
        ),
        */

      pageOffset,
      entriesPerPage
    );
  }
}
