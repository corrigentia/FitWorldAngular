import { Id } from './id'

export interface Class extends Id {
  martialArtId: number
  instructorId: number
  dateTime: Date
  pricePerHour: number
}
