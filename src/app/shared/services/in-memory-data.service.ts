import { Injectable } from '@angular/core'
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { StudentIdEmail } from '../../interfaces/student-id-email'
// import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb () {
    const students = [
      {
        studentId: 12,
        email: 'masutatsu@oyama.kr'
      },
      {
        studentId: 13,
        email: 'gichin@funakoshi.jp'
      },
      {
        studentId: 14,
        email: 'anko@itosu.jp'
      },
      {
        studentId: 15,
        email: 'chouki@motobu.jp'
      }
    ]

    const equipments = [
      {
        equipmentId: 1,
        name: 'Bo stick',
        price: 129.98
      },
      {
        equipmentId: 2,
        name: 'Bokken',
        price: 22.0
      },
      {
        equipmentId: 3,
        name: 'Hanbo',
        price: 16.9
      },
      {
        equipmentId: 4,
        name: 'Katana',
        price: 169.0
      },
      {
        equipmentId: 5,
        name: 'Tanto',
        price: 90.0
      },
      {
        equipmentId: 6,
        name: 'Uniform',
        price: 117.5
      }
    ]

    // TODO: discover reason why this must be encapsulated...!!
    // return students;
    return { equipments, students }
    return { students, equipments }
  }

  constructor () {}

  genId (students: StudentIdEmail[]): number {
    return students.length > 0
      ? Math.max(...students.map(student => student.studentId)) + 1
      : 11
  }
}
