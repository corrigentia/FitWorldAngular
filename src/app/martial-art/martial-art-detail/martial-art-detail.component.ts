import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MartialArt } from 'src/app/interfaces/martial-art';
import { MartialArtService } from 'src/app/martial-art/services/martial-art.service';

@Component({
  selector: 'app-martial-art-detail',
  templateUrl: './martial-art-detail.component.html',
  // styleUrls: ['./martial-art-detail.component.css'],
})
export class MartialArtDetailComponent implements OnInit {
  @Input() martialArt?: MartialArt;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly martialArtService: MartialArtService,
    private readonly location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.martialArt) {
      this.martialArtService
        .updateEntity(this.martialArt)
        .subscribe(() => this.goBack());
    }
  }

  getMartialArt(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.martialArtService
      .getEntity(id)
      .subscribe((martialArt) => (this.martialArt = martialArt));
  }

  ngOnInit(): void {
    this.getMartialArt();
  }
}
