import { Email } from './email';
import { StudentId } from './student-id';

export interface StudentIdEmail extends StudentId, Email {
  // studentId: number;
  // email: string;
}
