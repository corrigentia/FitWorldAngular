import { Id } from './id'

export interface Instructor extends Id {
  firstName: string
  lastName: string | null
}
