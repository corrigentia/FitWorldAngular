import { Id } from './id'
import { Name } from './name'

export interface Equipment extends Id, Name {
  price: number
}
