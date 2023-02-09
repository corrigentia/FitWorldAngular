import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap
} from 'rxjs'
import { Class as IClass } from 'src/app/interfaces/class'
import { Instructor } from 'src/app/interfaces/instructor'
import { MartialArt } from 'src/app/interfaces/martial-art'
import { Class } from 'src/app/models/class'
import { ClassService } from 'src/app/shared/services/class.service'
import { InstructorService } from 'src/app/shared/services/instructor.service'
import { MartialArtService } from 'src/app/shared/services/martial-art.service'

@Component({
  selector: 'app-class-search',
  templateUrl: './class-search.component.html',
  styleUrls: ['./class-search.component.css']
})
export class ClassSearchComponent implements OnInit {
  protected martialArts: MartialArt[] = []
  protected instructors: Instructor[] = []
  protected classes: IClass[] = []

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

  getClasses (): void {
    this.classService
      .getClasses()
      .subscribe(classes => (this.classes = classes))
  }

  protected aliasMartialArt (id: number): string {
    return (
      this.martialArts.find(martialArt => martialArt.martialArtId === id)
        ?.name ?? 'invalid martial art'
    )
  }

  protected aliasInstructor (id: number): string {
    const instructor = this.instructors.find(
      instructor => instructor.instructorId === id
    )
    return (
      instructor?.firstName.concat(' '.concat(instructor.lastName ?? '')) ??
      'invalid instructor'
    )
  }

  martialArtIdSought!: number
  instructorIdSought!: number
  dateTimeSought!: Date
  priceSought!: number

  private martialArtSearchTerms = new Subject<number>()
  private instructorSearchTerms = new Subject<number>()
  private dateTimeSearchTerms = new Subject<Date>()
  private priceSearchTerms = new Subject<number>()

  /**
   * Push a search term into the `Observable` stream
   *
   * @param id - a search term
   */
  searchByMartialArtId (id: number): void {
    this.martialArtSearchTerms.next(id)
  }

  searchByInstructorId (id: number): void {
    this.instructorSearchTerms.next(id)
  }

  searchByDateTime (dateTime: Date): void {
    this.dateTimeSearchTerms.next(dateTime)
  }

  searchByPrice (price: number): void {
    this.priceSearchTerms.next(price)
  }

  classesByMartialArtId$!: Observable<IClass[]>
  classesByInstructorId$!: Observable<IClass[]>
  classesByDateTime$!: Observable<IClass[]>
  classesByPrice$!: Observable<IClass[]>

  constructor (
    private readonly activatedRoute: ActivatedRoute,
    private readonly martialArtService: MartialArtService,
    private readonly instructorService: InstructorService,
    private readonly classService: ClassService
  ) {}

  ngOnInit (): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // this.getMartialArts();
    // this.getInstructors();
    // this.getClasses();

    this.activatedRoute.data.subscribe(
      ({ classes, instructors, martialArts }) => {
        this.classes = classes
        this.instructors = instructors
        this.martialArts = martialArts
      }
    )

    this.classesByMartialArtId$ = this.martialArtSearchTerms.pipe(
      // debounceTime(150),
      distinctUntilChanged(),
      // `switch` to new `search` `Observable` each time the `term` changes
      switchMap(id => this.classService.searchClassesByMartialArtId(id))
    )

    this.classesByInstructorId$ = this.instructorSearchTerms.pipe(
      // debounceTime(150),
      distinctUntilChanged(),
      // `switch` to new `search` `Observable` each time the `term` changes

      switchMap(id => this.classService.searchClassesByInstructorId(id))
    )

    this.classesByDateTime$ = this.dateTimeSearchTerms.pipe(
      // debounceTime(150),
      distinctUntilChanged(),

      // `switch` to new `search` `Observable` each time the `term` changes

      switchMap(dateTime => this.classService.searchClassesByDateTime(dateTime))
    )

    this.classesByPrice$ = this.priceSearchTerms.pipe(
      // debounceTime(150),
      distinctUntilChanged(),

      // `switch` to new `search` `Observable` each time the `term` changes
      switchMap(price => this.classService.searchClassesByPrice(price))
    )
  }
}
