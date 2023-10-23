import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from 'src/app/interfaces/equipment';
import { EquipmentService } from 'src/app/equipment/services/equipment.service';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  // styleUrls: ['./equipment-detail.component.css'],
})
export class EquipmentDetailComponent implements OnInit {
  @Input() equipment?: Equipment;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly equipmentService: EquipmentService,
    private readonly location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.equipment) {
      this.equipmentService
        .updateEntity(this.equipment)
        .subscribe(() => this.goBack());
    }
  }

  getEntity(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.equipmentService
      .getEntity(id)
      .subscribe((equipment) => (this.equipment = equipment));
  }

  ngOnInit(): void {
    this.getEntity();
  }
}
