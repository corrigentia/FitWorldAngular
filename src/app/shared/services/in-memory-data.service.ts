import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { StudentIdEmail } from '../../interfaces/student-id-email';
// import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const students = [
      {
        studentId: 12,
        email: 'masutatsu@oyama.kr',
      },
      {
        studentId: 13,
        email: 'gichin@funakoshi.jp',
      },
      {
        studentId: 14,
        email: 'anko@itosu.jp',
      },
      {
        studentId: 15,
        email: 'chouki@motobu.jp',
      },
    ];

    // TODO: discover reason why this must be encapsulated...!!
    // return students;
    return { students };
  }

  constructor() {}

  genId(students: StudentIdEmail[]): number {
    return students.length > 0
      ? Math.max(...students.map((student) => student.studentId)) + 1
      : 11;
  }
}
