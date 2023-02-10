import { Injectable } from '@angular/core'
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { Class } from 'src/app/interfaces/class'
import { Equipment } from 'src/app/interfaces/equipment'
import { Instructor } from 'src/app/interfaces/instructor'
import { MartialArt } from 'src/app/interfaces/martial-art'
import { StudentIdEmail } from '../../interfaces/student-id-email'
// import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb () {
    const students = [
      {
        studentId: 1,
        email: 'andrew_rix@fitworld.be'
      },
      {
        studentId: 2,
        email: 'bella_novy@fitworld.be'
      },
      {
        studentId: 3,
        email: 'chris_tyana@fitworld.be'
      },
      {
        studentId: 4,
        email: 'danny_kit@fitworld.be'
      },
      {
        studentId: 5,
        email: 'emma_star@fiworld.be'
      },
      {
        studentId: 6,
        email: 'fynn_chin@fitworld.be'
      },
      {
        studentId: 7,
        email: 'gottlieb_master@fitworld.be'
      },
      {
        studentId: 8,
        email: 'hector_sing@fitworld.be'
      },
      {
        studentId: 9,
        email: 'ibis_fall@fitworld.be'
      },
      {
        studentId: 10,
        email: 'jane_red@fitworld.be'
      },
      {
        studentId: 11,
        email: 'kourtney_k@fitworld.be'
      },
      {
        studentId: 12,
        email: 'lore_map@fitworld.be'
      },
      {
        studentId: 13,
        email: 'mane_shein@fitworld.be'
      },
      {
        studentId: 14,
        email: 'naave_stem@fitworld.be'
      },
      {
        studentId: 15,
        email: 'olivia_win@fitworld.be'
      },
      {
        studentId: 16,
        email: 'paolo_rubia@fitworld.be'
      },
      {
        studentId: 17,
        email: 'qian_storre@fitworld.be'
      },
      {
        studentId: 18,
        email: 'rider_ban@fitworld.be'
      },
      {
        studentId: 19,
        email: 'shannon_crow@fitworld.be'
      },
      {
        studentId: 20,
        email: 'tiffany_ruby@fitworld.be'
      },
      {
        studentId: 21,
        email: 'ursula_bear@fitworld.be'
      },
      {
        studentId: 22,
        email: 'veronika_bold@fitworld.be'
      },
      {
        studentId: 23,
        email: 'walter_must@fitworld.be'
      },
      {
        studentId: 24,
        email: 'xena_sim@fitworld.be'
      },
      {
        studentId: 25,
        email: 'yian_exo@fitworld.be'
      },
      {
        studentId: 26,
        email: 'zen_vann@fitworld.be'
      },
      {
        studentId: 27,
        email: 'username@site.tld'
      },
      {
        studentId: 28,
        email: 'masutatsu@oyama.kr'
      },
      {
        studentId: 29,
        email: 'gichin@funakoshi.jp'
      },
      {
        studentId: 30,
        email: 'anko@itosu.jp'
      },
      {
        studentId: 31,
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

    const martialArts = [
      {
        martialArtId: 1,
        name: 'Aikido'
      },
      {
        martialArtId: 2,
        name: 'Baguazhang'
      },
      {
        martialArtId: 3,
        name: 'Boxing'
      },
      {
        martialArtId: 4,
        name: 'Brazilian JuJutsu'
      },
      {
        martialArtId: 5,
        name: 'JKD'
      },
      {
        martialArtId: 6,
        name: 'Judo'
      },
      {
        martialArtId: 7,
        name: 'Karate'
      },
      {
        martialArtId: 8,
        name: 'Kendo'
      },
      {
        martialArtId: 9,
        name: 'Kickboxing'
      },
      {
        martialArtId: 10,
        name: 'MMA'
      },
      {
        martialArtId: 11,
        name: 'Muay Thai'
      },
      {
        martialArtId: 12,
        name: 'Ninjutsu'
      },
      {
        martialArtId: 13,
        name: 'Shaolin Kung Fu'
      },
      {
        martialArtId: 14,
        name: 'Tai chi'
      },
      {
        martialArtId: 15,
        name: 'TKD'
      },
      {
        martialArtId: 16,
        name: 'Wing Chun'
      }
    ]

    const instructors = [
      {
        instructorId: 2004,
        firstName: 'Astra',
        lastName: null
      },
      {
        instructorId: 2006,
        firstName: 'Bell',
        lastName: null
      },
      {
        instructorId: 1,
        firstName: 'Bruce',
        lastName: 'Lee'
      },
      {
        instructorId: 2005,
        firstName: 'Heinz',
        lastName: null
      },
      {
        instructorId: 3,
        firstName: 'Ip',
        lastName: 'Man'
      },
      {
        instructorId: 2,
        firstName: 'Jet',
        lastName: 'Li'
      },
      {
        instructorId: 2002,
        firstName: 'May',
        lastName: null
      },
      {
        instructorId: 4,
        firstName: 'Mike',
        lastName: 'Tyson'
      },
      {
        instructorId: 5,
        firstName: 'Muhammad',
        lastName: 'Ali'
      },
      {
        instructorId: 1001,
        firstName: 'Nameless',
        lastName: null
      },
      {
        instructorId: 1003,
        firstName: 'NoName',
        lastName: null
      },
      {
        instructorId: 2003,
        firstName: 'Tzaho',
        lastName: null
      },
      {
        instructorId: 2001,
        firstName: 'Xun',
        lastName: null
      },
      {
        instructorId: 2007,
        firstName: 'Yirusz',
        lastName: null
      }
    ]

    const classes = [
      {
        classId: 1,
        martialArtId: 2,
        instructorId: 1,
        dateTime: '2023-02-06T11:31:00',
        pricePerHour: 0.06
      },
      {
        classId: 2,
        martialArtId: 16,
        instructorId: 3,
        dateTime: '2023-02-06T22:20:00',
        pricePerHour: 0.42
      },
      {
        classId: 3,
        martialArtId: 3,
        instructorId: 4,
        dateTime: '2023-02-06T22:21:00',
        pricePerHour: 1.25
      },
      {
        classId: 4,
        martialArtId: 3,
        instructorId: 5,
        dateTime: '2023-02-06T22:21:00',
        pricePerHour: 1.17
      },
      {
        classId: 5,
        martialArtId: 13,
        instructorId: 2,
        dateTime: '2023-02-06T22:22:00',
        pricePerHour: 1.23
      }
    ]

    // TODO: discover reason why this must be encapsulated...!!
    // return students;
    return { students, equipments, martialArts, instructors, classes }
  }

  constructor () {}

  genId<T extends StudentIdEmail | Equipment | MartialArt | Instructor | Class> (
    collection: T[]
  ): number {
    console.log('typeof collection:', typeof collection)
    return 99
    /*
    return collection.length > 0
      ? Math.max(...collection.map(member => 
        switch (typeof member) {
          case stuidem:
            
            break;
        
          default:
            break;
        }
        )) + 1
      : 11
    */
  }
}
