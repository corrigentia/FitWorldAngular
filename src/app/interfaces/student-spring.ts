import { Authority } from './authority';
import { Class } from './class';
import { Email } from './email';
import { FirstName } from './first-name';
import { IOwnedEquipment } from './i-owned-equipment';
import { Id } from './id';
import { LastName } from './last-name';
import { Password } from './password';
import { Username } from './username';

export interface IStudentSpring
  extends Id,
    FirstName,
    LastName,
    // Username,
    Email,
    Password {
  ownedEquipments?: IOwnedEquipment[];
  classesTaken?: Class[];
  authorities?: Authority[];
  createdAt?: Date;
  updatedAt?: Date;
}
