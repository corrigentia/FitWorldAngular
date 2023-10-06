import { IStudentSpring } from 'src/app/interfaces/student-spring';

export interface AuthResponse {
  token: string;
  user: IStudentSpring;
}
