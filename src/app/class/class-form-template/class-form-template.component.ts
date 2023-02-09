import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CLASSES } from 'src/app/db/cached-classes';
import { Class as IClass } from 'src/app/interfaces/class';
import { Instructor } from 'src/app/interfaces/instructor';
import { MartialArt } from 'src/app/interfaces/martial-art';
import { Class } from 'src/app/models/class';
import { ClassService } from 'src/app/shared/services/class.service';
import { InstructorService } from 'src/app/shared/services/instructor.service';
import { Logger } from 'src/app/shared/services/logger.service';
import { MartialArtService } from 'src/app/shared/services/martial-art.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-class-form-template',
  templateUrl: './class-form-template.component.html',
  styleUrls: ['./class-form-template.component.css'],
})
export class ClassFormTemplateComponent {
  protected martialArts: MartialArt[] = [];
  protected instructors: Instructor[] = [];

  protected readonly martialArtClass = new Class(0, 0, new Date(''), 0.0);

  constructor(
    private readonly classService: ClassService,
    private readonly martialArtService: MartialArtService,
    private readonly instructorService: InstructorService,
    private readonly router: Router,
    private readonly logger: Logger,
    private readonly messageService: MessageService
  ) {}

  add(
    martialArtId: number,
    instructorId: number,
    dateTime: Date,
    pricePerHour: number
  ): void {
    if (!dateTime) {
      return;
    }

    this.classService
      .addClass({
        martialArtId,
        instructorId,
        dateTime,
        pricePerHour,
      } as IClass)
      .subscribe((martialArtClass) => {
        this.logger.log(`Added class ${JSON.stringify(martialArtClass)}`);
        this.messageService.add(
          `Added class ${JSON.stringify(martialArtClass)}`
        );

        // CLASSES.push({ martialArtId, instructorId, dateTime, pricePerHour } as IClass);
        CLASSES.push(martialArtClass);

        // this.router.onSameUrlNavigation = 'reload';
        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigateByUrl('classes');

        // this.router.routeReuseStrategy.shouldReuseRoute = () => true;
        // this.router.onSameUrlNavigation = 'ignore';
      });
  }

  getMartialArts(): void {
    this.martialArtService
      .getMartialArts()
      .subscribe((martialArts) => (this.martialArts = martialArts));
  }

  getInstructors(): void {
    this.instructorService
      .getInstructors()
      .subscribe((instructors) => (this.instructors = instructors));
  }

  ngOnInit(): void {
    this.getMartialArts();
    this.getInstructors();
  }
}
