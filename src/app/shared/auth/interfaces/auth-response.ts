import { IStudentSpring } from '../../../interfaces/student-spring';

export interface AuthResponse {
  token: string;
  user: IStudentSpring;
}
