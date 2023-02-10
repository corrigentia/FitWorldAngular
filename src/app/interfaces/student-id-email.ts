import { Email } from './email'
import { Id } from './id'
import { StudentId } from './student-id'

export interface StudentIdEmail extends /* StudentId */ Id, Email {}
