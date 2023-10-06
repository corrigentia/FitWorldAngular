import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MartialArt } from 'src/app/models/martial-art';
import { MartialArt as IMartialArt } from 'src/app/interfaces/martial-art';
import { Logger } from 'src/app/shared/services/logger.service';
import { MartialArtService } from 'src/app/martial-art/services/martial-art.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { MARTIAL_ARTS } from 'src/app/db/cached-martial-arts';

@Component({
  selector: 'app-martial-art-form-template',
  templateUrl: './martial-art-form-template.component.html',
  styleUrls: ['./martial-art-form-template.component.css'],
})
export class MartialArtFormTemplateComponent {
  martialArt = new MartialArt('');

  constructor(
    private readonly router: Router,
    private readonly logger: Logger,
    private readonly messageService: MessageService,
    private readonly martialArtService: MartialArtService
  ) {}

  add(name: string): void {
    // 30/01/2023
    // TODO: check for spaces before and after entered string
    name = name.trim();

    if (!name) {
      return;
    }

    this.martialArtService
      .addEntity({ name } as IMartialArt)
      .subscribe((martialArt) => {
        this.logger.log(`Added martial art ${JSON.stringify(martialArt)}`);
        this.messageService.add(
          `Added martial art ${JSON.stringify(martialArt)}`
        );

        // MARTIAL_ARTS.push({ name } as IMartialArt);
        MARTIAL_ARTS.push(martialArt);

        // this.router.onSameUrlNavigation = 'reload';
        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigateByUrl('martial-arts');

        // this.router.routeReuseStrategy.shouldReuseRoute = () => true;
        // this.router.onSameUrlNavigation = 'ignore';
      });
  }
}
