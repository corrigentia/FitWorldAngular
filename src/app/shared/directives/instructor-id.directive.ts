import { Directive, Injectable } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { INSTRUCTORS } from 'src/app/db/cached-instructors';
import { InstructorService } from '../../instructor/services/instructor.service';

const validInstructorIdHelper = (id: number): boolean => {
  console.log('the id is:', id, typeof id);
  for (const instructor of INSTRUCTORS) {
    console.log('instructor.id:', instructor.id);
    if (instructor.id === id) {
      return true;
    }
  }
  return false;
};

export const isValidInstructorId: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.value || !INSTRUCTORS.length) {
    return null;
  }

  const invalidInstructorId = !validInstructorIdHelper(control.value);

  return invalidInstructorId ? { validInstructorId: true } : null;
};

@Injectable({ providedIn: 'root' })
export class InstructorIdValidator implements Validator {
  static isValidInstructorId = isValidInstructorId;

  validate(control: AbstractControl): ValidationErrors | null {
    return isValidInstructorId(control);
  }
}

@Directive({
    selector: '[appInstructorId]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: InstructorIdValidatorDirective,
            multi: true,
        },
    ],
    standalone: false
})
export class InstructorIdValidatorDirective implements Validator {
  constructor(private readonly validator: InstructorIdValidator) {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator.validate(control);
  }
}
