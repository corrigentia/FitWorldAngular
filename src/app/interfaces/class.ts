import { Id } from './id';
import { Instructor } from './instructor';
import { MartialArt } from './martial-art';

export interface Class extends Id {
  // martialArtId: number;
  martialArt: MartialArt;
  // instructorId: number;
  instructor: Instructor;
  dateTime: Date;
  pricePerHour: number;
}
