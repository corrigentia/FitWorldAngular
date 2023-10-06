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
import { MartialArtService } from '../../martial-art/services/martial-art.service';

@Injectable({ providedIn: 'root' })
export class UniqueMartialArtValidator implements AsyncValidator {
  constructor(private readonly martialArtService: MartialArtService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.martialArtService.isEntityRegistered(control.value.trim()).pipe(
      map((isRegistered) => (isRegistered ? { uniqueMartialArt: true } : null)),
      catchError(() => of(null))
    );
  }
}

@Directive({
  selector: '[appUniqueMartialArt]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueMartialArtValidatorDirective),
      multi: true,
    },
  ],
})
export class UniqueMartialArtValidatorDirective implements AsyncValidator {
  constructor(private readonly validator: UniqueMartialArtValidator) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.validator.validate(control);
  }
}
