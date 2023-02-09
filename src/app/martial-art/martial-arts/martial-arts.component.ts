import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MartialArt } from 'src/app/interfaces/martial-art'
import { MartialArtService } from 'src/app/shared/services/martial-art.service'
import { MessageService } from 'src/app/shared/services/message.service'

@Component({
  selector: 'app-martial-arts',
  templateUrl: './martial-arts.component.html',
  styleUrls: ['./martial-arts.component.css']
})
export class MartialArtsComponent implements OnInit {
  protected martialArts: MartialArt[] = []

  selectedMartialArt?: MartialArt

  constructor (
    private readonly activatedRoute: ActivatedRoute,
    private readonly martialArtService: MartialArtService,
    private readonly messageService: MessageService,
    private readonly http: HttpClient
  ) {}

  onSelect (martialArt: MartialArt): void {
    this.selectedMartialArt = martialArt
    this.messageService.add(
      `MartialArtsComponent: Selected martialArt id=${martialArt.martialArtId}`
    )
  }

  delete (martialArtToDelete: MartialArt): void {
    this.martialArts = this.martialArts.filter(
      martialArt => martialArt != martialArtToDelete
    )

    this.martialArtService
      .deleteMartialArt(martialArtToDelete.martialArtId)
      .subscribe()
  }

  add (name: string): void {
    name = name.trim()

    if (!name) {
      return
    }

    this.martialArtService
      .addMartialArt({ name } as MartialArt)
      .subscribe(martialArt => this.martialArts.push(martialArt))
  }

  getMartialArts (): void {
    this.martialArtService
      .getMartialArts()
      .subscribe(martialArts => (this.martialArts = martialArts))
  }

  ngOnInit (): void {
    // this.getMartialArts();

    this.activatedRoute.data.subscribe(({ martialArts }) => {
      this.martialArts = martialArts
    })
  }
}
