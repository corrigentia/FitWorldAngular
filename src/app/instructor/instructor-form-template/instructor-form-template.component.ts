import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Instructor } from 'src/app/models/instructor';
import { Instructor as IInstructor } from 'src/app/interfaces/instructor';
import { InstructorService } from 'src/app/shared/services/instructor.service';
import { Logger } from 'src/app/shared/services/logger.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { INSTRUCTORS } from 'src/app/db/cached-instructors';

@Component({
  selector: 'app-instructor-form-template',
  templateUrl: './instructor-form-template.component.html',
  styleUrls: ['./instructor-form-template.component.css'],
})
export class InstructorFormTemplateComponent {
  instructor = new Instructor('');

  constructor(
    private readonly router: Router,
    private readonly logger: Logger,
    private readonly messageService: MessageService,
    private readonly instructorService: InstructorService
  ) {}

  add(firstName: string, lastName?: string): void {
    // 30/01/2023
    // TODO: check for spaces before and after entered string
    firstName = firstName.trim();
    lastName = lastName?.trim();

    if (!firstName) {
      return;
    }

    this.instructorService
      .addInstructor({ firstName, lastName } as IInstructor)
      .subscribe((instructor) => {
        this.logger.log(`Added equipment ${JSON.stringify(instructor)}`);
        this.messageService.add(
          `Added equipment ${JSON.stringify(instructor)}`
        );

        // INSTRUCTORS.push({ firstName, lastName } as IInstructor);
        INSTRUCTORS.push(instructor);


        // this.router.onSameUrlNavigation = 'reload';
        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigateByUrl('instructors');

        // this.router.routeReuseStrategy.shouldReuseRoute = () => true;
        // this.router.onSameUrlNavigation = 'ignore';

      });
  }
}
