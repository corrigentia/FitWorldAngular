import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from 'src/app/interfaces/equipment';
import { EquipmentService } from 'src/app/equipment/services/equipment.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css'],
})
export class EquipmentsComponent implements OnInit {
  protected equipments: Equipment[] = [];

  selectedEquipment?: Equipment;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly equipmentService: EquipmentService,
    private readonly messageService: MessageService,
    private readonly http: HttpClient
  ) {}

  onSelect(equipment: Equipment): void {
    this.selectedEquipment = equipment;
    this.messageService.add(
      `EquipmentsComponent: Selected equipment id=${equipment.id}`
    );
  }

  delete(entityToDelete: Equipment): void {
    console.log('inside delete equipment');

    this.equipments = this.equipments.filter(
      (equipment) => equipment != entityToDelete
    );

    console.log('about to really delete equipment from db');

    this.equipmentService.deleteEntity(entityToDelete.id).subscribe();

    console.log('should have really deleted equipment from db');
  }

  add(name: string, price: number): void {
    name = name.trim();

    if (!name || !price) {
      return;
    }

    this.equipmentService
      .addEntity({ name, price } as Equipment)
      .subscribe((equipment) => this.equipments.push(equipment));
  }

  page = 1;
  entriesPerPage = 5;

  getAll(): void {
    this.equipmentService
      .getEquipments(this.page - 1, this.entriesPerPage)
      .subscribe((equipments) => {
        this.equipments = equipments;
        // fetched first few in order set by db

        // sorted for each refresh after initial load
        // this.equipments =  /** no need because it mutates array in-place! */
        /*
        this.equipments.sort(
          (left, right) => left.id - right.id
        );
        */
      });
  }

  ngOnInit(): void {
    // this.getAll()

    this.activatedRoute.data.subscribe(({ equipments }) => {
      this.equipments = equipments;
      // fetched first few in order set by db

      // sorted on first load
      /*
      this.equipments.sort((left, right) => left.id - right.id);
      */
    });
  }
}
