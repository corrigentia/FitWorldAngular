import { Pipe, PipeTransform } from '@angular/core';
import { IOwnedEquipment } from '../../interfaces/i-owned-equipment';

@Pipe({
    name: 'ownedEquipment',
    standalone: false
})
export class OwnedEquipmentPipe implements PipeTransform {
  transform(value: IOwnedEquipment, ...args: unknown[]): unknown {
    return `
    ${value.quantity} * ${value.equipment.name} @ ${value.equipment.price}
    `;
  }
}
