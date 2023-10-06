import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Equipment } from 'src/app/interfaces/equipment';
import { EquipmentService } from '../../equipment/services/equipment.service';

@Injectable({
  providedIn: 'root',
})
export class EquipmentsResolver implements Resolve<Equipment[]> {
  constructor(private readonly equipmentService: EquipmentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Equipment[]> {
    console.log('Called get Equipments in resolver', route);
    return this.equipmentService.getEquipments(0,99999);
  }
}
