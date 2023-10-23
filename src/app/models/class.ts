import { TrackByFunction } from '@angular/core';

export class Class {
  constructor(
    public martialArtId: number,
    public instructorId: number,
    public dateTime: Date,
    public pricePerHour: number
  ) {}

  // cannot use it; must be in component .ts; might as well delete it from here
  dateTimeTrackBy: TrackByFunction<Class> = (index: number, item: Class) =>
    item.dateTime;
}
