import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Equipment } from 'src/app/models/equipment';
import { Equipment as IEquipment } from 'src/app/interfaces/equipment';
import {
  realUniqueEquipmentValidator,
  UniqueEquipmentValidator,
} from 'src/app/shared/directives/equipment.directive';
import { EquipmentService } from 'src/app/equipment/services/equipment.service';
import { Logger } from 'src/app/shared/services/logger.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { EQUIPMENTS } from 'src/app/db/cached-equipments';

@Component({
  selector: 'app-equipment-form-reactive',
  templateUrl: './equipment-form-reactive.component.html',
  styleUrls: ['./equipment-form-reactive.component.css'],
})
export class EquipmentFormReactiveComponent implements OnInit {
  equipment = new Equipment('', 0.0);

  equipmentForm!: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly logger: Logger,
    private readonly messageService: MessageService,
    private readonly equipmentValidator: UniqueEquipmentValidator,
    private readonly equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {
    this.equipmentForm = new FormGroup(
      {
        name: new FormControl(
          this.equipment.name,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(42),
          ],
          []
        ),
        price: new FormControl(
          this.equipment.price,
          [
            Validators.required,
            Validators.min(0.01),
            Validators.max(99999999998.99),
          ],
          []
        ),
      },
      {
        asyncValidators: [realUniqueEquipmentValidator],
      }
      /*
      It looks like you're constructing using a FormControl with both an options argument and an
  async validators argument. Mixing these arguments will cause your async validators to be dropped.
  You should either put all your validators in the options object, or in separate validators
  arguments. For example:

  // Using validators arguments
  fc = new FormControl(42, Validators.required, myAsyncValidator);

  // Using AbstractControlOptions
  fc = new FormControl(42, {validators: Validators.required, asyncValidators: myAV});

  // Do NOT mix them: async validators will be dropped!
  fc = new FormControl(42, {validators: Validators.required}, /* Oops! */
      /*
      myAsyncValidator);
       */
      // [realUniqueEquipmentValidator]
    ); // <-- add custom validator at the FormGroup level
  }

  get name() {
    return this.equipmentForm.get('name')!;
  }

  get price() {
    return this.equipmentForm.get('price')!;
  }

  add(name: string, price: number): void {
    name = name.trim();

    if (!name || !price) {
      return;
    }

    this.equipmentService
      .addEntity({ name, price } as IEquipment)
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

  onSubmit(): void {
    this.add(this.name.value.trim(), this.price.value);
  }
}
