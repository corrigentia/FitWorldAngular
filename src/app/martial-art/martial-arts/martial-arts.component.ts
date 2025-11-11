import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MartialArt } from 'src/app/interfaces/martial-art';
import { MartialArtService } from 'src/app/martial-art/services/martial-art.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
    selector: 'app-martial-arts',
    templateUrl: './martial-arts.component.html',
    standalone: false
})
export class MartialArtsComponent implements OnInit {
  protected entityCollection: MartialArt[] = [];

  selectedMartialArt?: MartialArt;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly martialArtService: MartialArtService,
    private readonly messageService: MessageService,
    private readonly http: HttpClient
  ) {}

  onSelect(martialArt: MartialArt): void {
    this.selectedMartialArt = martialArt;
    this.messageService.add(
      `MartialArtsComponent: Selected martialArt id=${martialArt.id}`
    );
  }

  delete(martialArtToDelete: MartialArt): void {
    this.entityCollection = this.entityCollection.filter(
      (martialArt) => martialArt != martialArtToDelete
    );

    this.martialArtService.deleteEntity(martialArtToDelete.id).subscribe();
  }

  add(name: string): void {
    name = name.trim();

    if (!name) {
      return;
    }

    this.martialArtService
      .addEntity({ name } as MartialArt)
      .subscribe((martialArt) => this.entityCollection.push(martialArt));
  }

  page = 1;
  entriesPerPage = 5;

  getAll(): void {
    this.martialArtService
      .getMartialArts(this.page - 1, this.entriesPerPage)
      .subscribe((martialArts) => (this.entityCollection = martialArts));
  }

  ngOnInit(): void {
    // this.getAll();

    this.activatedRoute.data.subscribe(({ martialArts }) => {
      this.entityCollection = martialArts;
    });
  }
}
