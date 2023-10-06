import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Instructor } from 'src/app/interfaces/instructor';
import { InstructorService } from 'src/app/instructor/services/instructor.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css'],
})
export class InstructorsComponent implements OnInit {
  protected instructors: Instructor[] = [];

  selectedInstructor?: Instructor;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly instructorService: InstructorService,
    private readonly messageService: MessageService,
    private readonly http: HttpClient
  ) {}

  onSelect(instructor: Instructor): void {
    this.selectedInstructor = instructor;
    this.messageService.add(
      `InstructorsComponent: Selected instructor id=${instructor.id}`
    );
  }

  delete(instructorToDelete: Instructor): void {
    this.instructors = this.instructors.filter(
      (instructor) => instructor != instructorToDelete
    );

    this.instructorService.deleteEntity(instructorToDelete.id).subscribe();
  }

  add(firstName: string, lastName: string): void {
    firstName = firstName.trim();
    lastName = lastName.trim();

    if (!firstName) {
      return;
    }

    this.instructorService
      .addEntity({ firstName, lastName } as Instructor)
      .subscribe((instructor) => this.instructors.push(instructor));
  }

  page = 1;
  entriesPerPage = 5;

  getInstructors(): void {
    this.instructorService
      .getInstructors(this.page - 1, this.entriesPerPage)
      .subscribe((instructors) => (this.instructors = instructors));
  }

  ngOnInit(): void {
    // this.getInstructors();

    this.activatedRoute.data.subscribe(({ instructors }) => {
      this.instructors = instructors;
    });
  }
}
