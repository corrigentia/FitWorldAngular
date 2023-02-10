import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map, takeWhile } from 'rxjs/operators'
import { Class } from 'src/app/interfaces/class'
import { Instructor } from 'src/app/interfaces/instructor'
import { MartialArt } from 'src/app/interfaces/martial-art'
import { ClassService } from 'src/app/shared/services/class.service'
import { InstructorService } from 'src/app/shared/services/instructor.service'
import { MartialArtService } from 'src/app/shared/services/martial-art.service'
import { MessageService } from 'src/app/shared/services/message.service'

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  protected classes: Class[] = []
  protected martialArts: MartialArt[] = []
  protected instructors: Instructor[] = []

  // protected martialArtIds: number[] = [];
  // protected instructorIds: number[] = [];

  selectedClass?: Class
  selectedMartialArtId!: number
  selectedInstructorId!: number

  constructor (
    private readonly activatedRoute: ActivatedRoute,
    private readonly classService: ClassService,
    private readonly messageService: MessageService,
    private readonly http: HttpClient,
    private readonly martialArtService: MartialArtService,
    private readonly instructorService: InstructorService
  ) {}

  onSelect (classToSelect: Class): void {
    this.selectedClass = classToSelect
    this.messageService.add(
      `ClassesComponent: Selected class id=${classToSelect.id}`
    )
  }

  delete (classToDelete: Class): void {
    this.classes = this.classes.filter(
      classElement => classElement != classToDelete
    )

    this.classService.deleteClass(classToDelete.id).subscribe()
  }

  // TODO: HACK: FIXME: Date type variable
  add (
    martialArtId: number,
    instructorId: number,
    dateTimeString: /*Date*/ string,
    pricePerHour: number
  ): void {
    const dateTime = new Date(dateTimeString)

    if (!martialArtId || !instructorId || !dateTime || !pricePerHour) {
      return
    }

    this.classService
      .addClass({
        martialArtId,
        instructorId,
        dateTime,
        pricePerHour
      } as Class)
      .subscribe(addedClass => this.classes.push(addedClass))
  }

  getClasses (): void {
    this.classService
      .getClasses()
      .subscribe(classes => (this.classes = classes))
  }

  getMartialArts (): void {
    this.martialArtService
      .getMartialArts()
      .subscribe(martialArts => (this.martialArts = martialArts))
  }

  getInstructors (): void {
    this.instructorService
      .getInstructors()
      .subscribe(instructors => (this.instructors = instructors))
  }

  /*
  getMartialArtIds(): void {
    this.martialArtService
      .getMartialArts()
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

  ngOnInit (): void {
    // this.getClasses()

    this.activatedRoute.data.subscribe(({ classes }) => {
      this.classes = classes
    })

    // this.getMartialArts();
    // this.getMartialArtIds();
    // this.getInstructors()
    // this.getInstructorIds();
  }
}
