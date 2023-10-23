import {
  Injectable,
  OnInit,
  Signal,
  WritableSignal,
  signal,
} from '@angular/core';
// import { Equipment } from '../../models/equipment';
import { Equipment } from '../../interfaces/equipment';
import { StudentService } from '../../student/services/student.service';
import { SessionService } from '../../shared/session/services/session.service';
import { IOwnedEquipment } from '../../interfaces/i-owned-equipment';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  items?: IOwnedEquipment[];
  // ownedEquipments?: IOwnedEquipment[];

  addToCart(equipment: Equipment) {
    let isEquipmentOwned = false;

    this.fetchOwnedEquipments();

    console.log(equipment);
    console.log(this.items);

    for (const item of this.items!) {
      if (!isEquipmentOwned && item.equipment.name === equipment.name) {
        isEquipmentOwned = true;

        item.quantity++;
      }
    }
    if (!isEquipmentOwned) {
      this.items?.push({ equipment, quantity: 1 } as IOwnedEquipment);
    }

    /*
    if (this.items.keys.includes(equipment)) {
    // this.items.push(equipment);
    this.items[0].

    }
    */
  }

  getItems() {
    console.log(this.items);

    return this.items;
  }

  constructor(
    private readonly _studentService: StudentService,
    private readonly _session: SessionService
  ) {
    this.fetchOwnedEquipments();
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.fetchOwnedEquipments();
  }

  getLoggedInUser() {
    return this._studentService.getEntity(this._session.data?.id!);
  }

  fetchOwnedEquipments() {
    this.getLoggedInUser().subscribe(
      (student) => (this.items = student.ownedEquipments)
    );

    return this.getItems();
  }
}
