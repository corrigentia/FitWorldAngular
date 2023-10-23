import { Authority } from './authority';
import { Email } from './email';
import { FirstName } from './first-name';
import { IOwnedEquipment } from './i-owned-equipment';
import { Id } from './id';
import { LastName } from './last-name';
import { Password } from './password';
import { Username } from './username';

export interface Instructor
  extends Id,
    // Username,
    Email,
    Password,
    FirstName,
    LastName {
  ownedEquipments: IOwnedEquipment[];
  authorities: Authority[];
  createdAt: Date;
  updatedAt: Date;
}
