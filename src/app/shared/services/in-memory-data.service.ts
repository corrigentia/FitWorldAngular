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
    const students: StudentIdEmail[] = [
      {
        id: 1,
        email: 'andrew_rix@fitworld.be'
      },
      {
        id: 2,
        email: 'bella_novy@fitworld.be'
      },
      {
        id: 3,
        email: 'chris_tyana@fitworld.be'
      },
      {
        id: 4,
        email: 'danny_kit@fitworld.be'
      },
      {
        id: 5,
        email: 'emma_star@fiworld.be'
      },
      {
        id: 6,
        email: 'fynn_chin@fitworld.be'
      },
      {
        id: 7,
        email: 'gottlieb_master@fitworld.be'
      },
      {
        id: 8,
        email: 'hector_sing@fitworld.be'
      },
      {
        id: 9,
        email: 'ibis_fall@fitworld.be'
      },
      {
        id: 10,
        email: 'jane_red@fitworld.be'
      },
      {
        id: 11,
        email: 'kourtney_k@fitworld.be'
      },
      {
        id: 12,
        email: 'lore_map@fitworld.be'
      },
      {
        id: 13,
        email: 'mane_shein@fitworld.be'
      },
      {
        id: 14,
        email: 'naave_stem@fitworld.be'
      },
      {
        id: 15,
        email: 'olivia_win@fitworld.be'
      },
      {
        id: 16,
        email: 'paolo_rubia@fitworld.be'
      },
      {
        id: 17,
        email: 'qian_storre@fitworld.be'
      },
      {
        id: 18,
        email: 'rider_ban@fitworld.be'
      },
      {
        id: 19,
        email: 'shannon_crow@fitworld.be'
      },
      {
        id: 20,
        email: 'tiffany_ruby@fitworld.be'
      },
      {
        id: 21,
        email: 'ursula_bear@fitworld.be'
      },
      {
        id: 22,
        email: 'veronika_bold@fitworld.be'
      },
      {
        id: 23,
        email: 'walter_must@fitworld.be'
      },
      {
        id: 24,
        email: 'xena_sim@fitworld.be'
      },
      {
        id: 25,
        email: 'yian_exo@fitworld.be'
      },
      {
        id: 26,
        email: 'zen_vann@fitworld.be'
      },
      {
        id: 27,
        email: 'username@site.tld'
      },
      {
        id: 28,
        email: 'masutatsu@oyama.kr'
      },
      {
        id: 29,
        email: 'gichin@funakoshi.jp'
      },
      {
        id: 30,
        email: 'anko@itosu.jp'
      },
      {
        id: 31,
        email: 'chouki@motobu.jp'
      }
    ].sort(student => student.id)

    const equipments: Equipment[] = [
      {
        id: 1,
        name: 'Bo stick',
        price: 129.98
      },
      {
        id: 2,
        name: 'Bokken',
        price: 22.0
      },
      {
        id: 3,
        name: 'Hanbo',
        price: 16.9
      },
      {
        id: 4,
        name: 'Katana',
        price: 169.0
      },
      {
        id: 5,
        name: 'Tanto',
        price: 90.0
      },
      {
        id: 6,
        name: 'Uniform',
        price: 117.5
      }
    ].sort(equipment => equipment.id)

    const martialArts: MartialArt[] = [
      {
        id: 1,
        name: 'Aikido'
      },
      {
        id: 2,
        name: 'Baguazhang'
      },
      {
        id: 3,
        name: 'Boxing'
      },
      {
        id: 4,
        name: 'Brazilian JuJutsu'
      },
      {
        id: 5,
        name: 'JKD'
      },
      {
        id: 6,
        name: 'Judo'
      },
      {
        id: 7,
        name: 'Karate'
      },
      {
        id: 8,
        name: 'Kendo'
      },
      {
        id: 9,
        name: 'Kickboxing'
      },
      {
        id: 10,
        name: 'MMA'
      },
      {
        id: 11,
        name: 'Muay Thai'
      },
      {
        id: 12,
        name: 'Ninjutsu'
      },
      {
        id: 13,
        name: 'Shaolin Kung Fu'
      },
      {
        id: 14,
        name: 'Tai chi'
      },
      {
        id: 15,
        name: 'TKD'
      },
      {
        id: 16,
        name: 'Wing Chun'
      }
    ].sort(martialArt => martialArt.id)

    const instructors: Instructor[] = [
      {
        id: 2004,
        firstName: 'Astra',
        lastName: null
      },
      {
        id: 2006,
        firstName: 'Bell',
        lastName: null
      },
      {
        id: 1,
        firstName: 'Bruce',
        lastName: 'Lee'
      },
      {
        id: 2005,
        firstName: 'Heinz',
        lastName: null
      },
      {
        id: 3,
        firstName: 'Ip',
        lastName: 'Man'
      },
      {
        id: 2,
        firstName: 'Jet',
        lastName: 'Li'
      },
      {
        id: 2002,
        firstName: 'May',
        lastName: null
      },
      {
        id: 4,
        firstName: 'Mike',
        lastName: 'Tyson'
      },
      {
        id: 5,
        firstName: 'Muhammad',
        lastName: 'Ali'
      },
      {
        id: 1001,
        firstName: 'Nameless',
        lastName: null
      },
      {
        id: 1003,
        firstName: 'NoName',
        lastName: null
      },
      {
        id: 2003,
        firstName: 'Tzaho',
        lastName: null
      },
      {
        id: 2001,
        firstName: 'Xun',
        lastName: null
      },
      {
        id: 2007,
        firstName: 'Yirusz',
        lastName: null
      }
    ].sort(instructor => instructor.id)

    const classes: Class[] = [
      {
        id: 1,
        martialArtId: 2,
        instructorId: 1,
        dateTime: new Date('2023-02-06T11:31:00'),
        pricePerHour: 0.06
      },
      {
        id: 2,
        martialArtId: 16,
        instructorId: 3,
        dateTime: new Date('2023-02-06T22:20:00'),
        pricePerHour: 0.42
      },
      {
        id: 3,
        martialArtId: 3,
        instructorId: 4,
        dateTime: new Date('2023-02-06T22:21:00'),
        pricePerHour: 1.25
      },
      {
        id: 4,
        martialArtId: 3,
        instructorId: 5,
        dateTime: new Date('2023-02-06T22:21:00'),
        pricePerHour: 1.17
      },
      {
        id: 5,
        martialArtId: 13,
        instructorId: 2,
        dateTime: new Date('2023-02-06T22:22:00'),
        pricePerHour: 1.23
      }
    ].sort(martialArtClass => martialArtClass.id)

    // TODO: discover reason why this must be encapsulated...!!
    // return students;
    return { students, equipments, martialArts, instructors, classes }
  }

  constructor () {}

  genId<T extends StudentIdEmail | Equipment | MartialArt | Instructor | Class> (
    collection: T[]
  ): number {
    console.log('typeof collection:', typeof collection)
    console.log('typeof (collection[0]):', typeof collection[0])

    return collection.length > 0
      ? Math.max(...collection.map(member => member.id)) + 1
      : 51
  }
}
