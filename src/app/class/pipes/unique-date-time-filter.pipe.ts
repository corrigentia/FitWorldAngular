import { Pipe, PipeTransform } from '@angular/core';
import { Class } from '../../interfaces/class';

@Pipe({
  name: 'uniqueDateTimeFilter',
})
export class UniqueDateTimeFilterPipe implements PipeTransform {
  transform(value: Class[], ...args: unknown[]): Class[] {
    return value.filter(
      (martialArtClass, index, self) =>
        self
          .map((givenClass) => givenClass.dateTime)
          .indexOf(martialArtClass.dateTime) === index
    );
  }
}
