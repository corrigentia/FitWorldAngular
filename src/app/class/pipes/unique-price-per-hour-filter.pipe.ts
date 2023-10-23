import { Pipe, PipeTransform } from '@angular/core';
import { Class } from '../../interfaces/class';

@Pipe({
  name: 'uniquePricePerHourFilter',
})
export class UniquePricePerHourFilterPipe implements PipeTransform {
  transform(value: Class[], ...args: unknown[]): Class[] {
    return value.filter(
      (martialArtClass, index, self) =>
        self
          .map((givenClass) => givenClass.pricePerHour)
          .indexOf(martialArtClass.pricePerHour) === index
    );
  }
}
