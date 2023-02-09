import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { EQUIPMENTS } from 'src/app/db/cached-equipments';
import { Equipment } from 'src/app/models/equipment';
import { EquipmentService } from '../services/equipment.service';

export const realUniqueEquipmentValidator: AsyncValidatorFn = (
  control: AbstractControl
): Observable<ValidationErrors | null> => {
  const name = control.get('name');
  const price = control.get('price');

  if (!name || !price) {
    return of(null);
  }

  // console.error('cached equipments:', JSON.stringify(EQUIPMENTS));

  // console.error('name', name.value);
  // console.error('price', price.value);
  // console.error('new Equipment', new Equipment(name.value.trim(), price.value));
  /*
  console.error('new as Equipment', {
    name: name.value.trim(),
    price: price.value,
  } as Equipment);
  */
  // console.error('existing Equipment', EQUIPMENTS[6]);

  /*
  console.error(
    EQUIPMENTS.filter(
      (equipment) =>
        equipment.name === name.value.trim() && equipment.price === price.value
    )
  );
  */

  /*
  const isRegistered: boolean = EQUIPMENTS.includes({
    name: name.value.trim(),
    price: price.value,
  } as Equipment);
  */
  const isRegistered: boolean =
    EQUIPMENTS.filter(
      (equipment) =>
        equipment.name.toUpperCase() === name.value.toUpperCase().trim() &&
        equipment.price === price.value
    ).length > 0;

  // console.error('isRegistered', isRegistered);

  // return of<Boolean>(isRegistered);
  return of(isRegistered ? { uniqueEquipment: true } : null).pipe(delay(400));

  /*
  // 27/01/2023
  // TODO: cannot have an instance of the service because I don't have a constructor in the function
  return this.equipmentService
    .isEquipmentRegistered(name.value.trim(), price.value)
    .pipe(
      map((isRegistered) => (isRegistered ? { uniqueEquipment: true } : null)),
      catchError(() => of(null))
  );
  */
};

@Injectable({ providedIn: 'root' })
export class UniqueEquipmentValidator implements AsyncValidator {
  constructor(private equipmentService: EquipmentService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const name = control.get('name');
    const price = control.get('price');

    if (!name || !price) {
      return of(null);
    }

    return this.equipmentService
      .isEquipmentRegistered(name.value.trim(), price.value)
      .pipe(
        map((isRegistered) =>
          isRegistered ? { uniqueEquipment: true } : null
        ),
        catchError(() => of(null))
      );
  }
}

@Directive({
  selector: '[appUniqueEquipment]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueEquipmentValidatorDirective),
      multi: true,
    },
  ],
})
export class UniqueEquipmentValidatorDirective implements AsyncValidator {
  constructor(private validator: UniqueEquipmentValidator) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.validator.validate(control);
  }
}
