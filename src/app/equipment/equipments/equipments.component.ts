import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Equipment } from 'src/app/interfaces/equipment'
import { EquipmentService } from 'src/app/shared/services/equipment.service'
import { MessageService } from 'src/app/shared/services/message.service'

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {
  protected equipments: Equipment[] = []

  selectedEquipment?: Equipment

  constructor (
    private readonly activatedRoute: ActivatedRoute,
    private readonly equipmentService: EquipmentService,
    private readonly messageService: MessageService,
    private readonly http: HttpClient
  ) {}

  onSelect (equipment: Equipment): void {
    this.selectedEquipment = equipment
    this.messageService.add(
      `EquipmentsComponent: Selected equipment id=${equipment.id}`
    )
  }

  delete (equipmentToDelete: Equipment): void {
    this.equipments = this.equipments.filter(
      equipment => equipment != equipmentToDelete
    )

    this.equipmentService.deleteEquipment(equipmentToDelete.id).subscribe()
  }

  add (name: string, price: number): void {
    name = name.trim()

    if (!name || !price) {
      return
    }

    this.equipmentService
      .addEquipment({ name, price } as Equipment)
      .subscribe(equipment => this.equipments.push(equipment))
  }

  getEquipments (): void {
    this.equipmentService
      .getEquipments()
      .subscribe(equipments => (this.equipments = equipments))
  }

  ngOnInit (): void {
    // this.getEquipments()

    this.activatedRoute.data.subscribe(({ equipments }) => {
      this.equipments = equipments
    })
  }
}
