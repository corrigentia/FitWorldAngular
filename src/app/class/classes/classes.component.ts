import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class } from 'src/app/interfaces/class';
import { Instructor } from 'src/app/interfaces/instructor';
import { MartialArt } from 'src/app/interfaces/martial-art';
import { Class as ClassClass } from 'src/app/models/class';
import { ClassService } from 'src/app/class/services/class.service';
import { InstructorService } from 'src/app/instructor/services/instructor.service';
import { MartialArtService } from 'src/app/martial-art/services/martial-art.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  // styleUrls: ['./classes.component.css'],
})
export class ClassesComponent implements OnInit {
  protected classes: Class[] = [];
  protected martialArts: MartialArt[] = [];
  protected instructors: Instructor[] = [];

  // protected martialArtIds: number[] = [];
  // protected instructorIds: number[] = [];

  selectedClass?: Class;
  selectedMartialArtId!: number;
  selectedInstructorId!: number;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly classService: ClassService,
    private readonly messageService: MessageService,
    private readonly http: HttpClient,
    private readonly martialArtService: MartialArtService,
    protected readonly instructorService: InstructorService
  ) {}

  onSelect(classToSelect: Class): void {
    this.selectedClass = classToSelect;
    this.messageService.add(
      `ClassesComponent: Selected class id=${classToSelect.id}`
    );
  }

  delete(classToDelete: Class): void {
    this.classes = this.classes.filter(
      (classElement) => classElement != classToDelete
    );

    this.classService.deleteEntity(classToDelete.id).subscribe();
  }

  // TODO: HACK: FIXME: Date type variable
  add(
    martialArtId: number,
    instructorId: number,
    dateTimeString: /*Date*/ string,
    pricePerHour: number
  ): void {
    const dateTime = new Date(dateTimeString);

    if (!martialArtId || !instructorId || !dateTime || !pricePerHour) {
      return;
    }

    this.classService
      .addEntity({
        martialArtId,
        instructorId,
        dateTime,
        pricePerHour,
      } as ClassClass)
      .subscribe((addedClass) => this.classes.push(addedClass));
  }

  page = 1;
  entriesPerPage = 5;

  getClasses(): void {
    this.classService
      .getClasses(this.page - 1, this.entriesPerPage)
      .subscribe((classes) => (this.classes = classes));
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

  get getInstructor() {
    const that = this;
    return (id: number): Instructor | undefined => {
      return that.instructors.find(
        (instructor: Instructor) => instructor.id === id
      );
    };
  }

  /*
  getMartialArtIds(): void {
    this.martialArtService
      .getAll()
      .subscribe((martialArts) =>
        martialArts.forEach((martialArt) =>
          this.martialArtIds.push(martialArt.id)
        )
      );
  }

  getInstructorIds(): void {
    this.instructorService
      .getInstructors()
      .subscribe((instructors) =>
        instructors.forEach((instructor) =>
          this.instructorIds.push(instructor.id)
        )
      );
  }
  */

  ngOnInit(): void {
    // this.getClasses()

    this.activatedRoute.data.subscribe(({ classes }) => {
      this.classes = classes;
    });

    // this.getMartialArts();
    // this.getMartialArtIds();
    // this.getInstructors()
    // this.getInstructorIds();
  }
}
