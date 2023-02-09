import { Component } from '@angular/core';
import { Equipment } from 'src/app/models/equipment';
import { Equipment as IEquipment } from 'src/app/interfaces/equipment';
import { EquipmentService } from 'src/app/shared/services/equipment.service';
import { Logger } from 'src/app/shared/services/logger.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { Router } from '@angular/router';
import { EQUIPMENTS } from 'src/app/db/cached-equipments';

@Component({
  selector: 'app-equipment-form-template',
  templateUrl: './equipment-form-template.component.html',
  styleUrls: ['./equipment-form-template.component.css'],
})
export class EquipmentFormTemplateComponent {
  equipment = new Equipment('', 0.0);

  constructor(
    private readonly router: Router,
    private readonly logger: Logger,
    private readonly messageService: MessageService,
    private readonly equipmentService: EquipmentService
  ) {}

  add(name: string, price: number): void {
    // 30/01/2023
    // TODO: check for spaces before and after entered string
    name = name.trim();

    if (!name) {
      return;
    }

    this.equipmentService
      .addEquipment({ name, price } as IEquipment)
      .subscribe((equipment) => {
        this.logger.log(`Added equipment ${JSON.stringify(equipment)}`);
        this.messageService.add(`Added equipment ${JSON.stringify(equipment)}`);

        // EQUIPMENTS.push({ name, price } as IEquipment);
        EQUIPMENTS.push(equipment);

        // this.router.onSameUrlNavigation = 'reload';
        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigateByUrl('equipments');

        // this.router.routeReuseStrategy.shouldReuseRoute = () => true;
        // this.router.onSameUrlNavigation = 'ignore';
      });
  }
}
