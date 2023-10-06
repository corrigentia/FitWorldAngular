import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Equipment } from 'src/app/interfaces/equipment';
import { EquipmentService } from '../../equipment/services/equipment.service';

@Injectable({
  providedIn: 'root',
})
export class EquipmentResolver  {
  constructor(private readonly equipmentService: EquipmentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Equipment> {
    const id = parseInt(route.paramMap.get('id')!, 10);

    // console.log('Called get Equipment in resolver...', route)
    console.log(`Called get Equipment id=${id} in resolver...`, route);

    return this.equipmentService.getEntity(id);
  }
}
