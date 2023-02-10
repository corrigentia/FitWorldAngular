import { Directive, Injectable } from '@angular/core'
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn
} from '@angular/forms'
import { MARTIAL_ARTS } from 'src/app/db/cached-martial-arts'
import { MartialArtService } from '../services/martial-art.service'

const validMartialArtIdHelper = (id: number): boolean => {
  for (const martialArt of MARTIAL_ARTS) {
    if (martialArt.id === id) {
      return true
    }
  }
  return false
}

export const isValidMartialArtId: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.value || !MARTIAL_ARTS.length) {
    return null
  }

  const invalidMartialArtId = !validMartialArtIdHelper(control.value)

  return invalidMartialArtId ? { validMartialArtId: true } : null
}

@Injectable({ providedIn: 'root' })
export class MartialArtIdValidator implements Validator {
  static isValidMartialArtId = isValidMartialArtId

  validate (control: AbstractControl): ValidationErrors | null {
    return isValidMartialArtId(control)
  }
}

@Directive({
  selector: '[appMartialArtId]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MartialArtIdValidatorDirective,
      multi: true
    }
  ]
})
export class MartialArtIdValidatorDirective implements Validator {
  constructor (private readonly validator: MartialArtIdValidator) {}

  validate (control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator.validate(control)
  }
}
