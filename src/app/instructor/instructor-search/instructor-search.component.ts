import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Instructor } from 'src/app/interfaces/instructor';
import { InstructorService } from '../services/instructor.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { InstructorSearchService } from './services/instructor-search.service';

@Component({
    selector: 'app-instructor-search',
    templateUrl: './instructor-search.component.html',
    standalone: false
})
export class InstructorSearchComponent implements OnInit {
  protected instructors: Instructor[] = [];
  protected firstNameSought!: string;
  protected lastNameSought!: string;

  protected uniqueFirstNames!: string[];
  protected uniqueLastNames!: (string | null)[];

  private readonly collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
  });

  getInstructors(): void {
    this.instructorService.getInstructors().subscribe((instructors) => {
      this.instructors = instructors;

      console.log(instructors.map((instructor) => instructor.firstName));

      this.uniqueFirstNames = instructors
        .map((instructor) => instructor.firstName)
        .filter(
          (firstName, idx, firstNames) => firstNames.indexOf(firstName) === idx
        )
        .sort(this.collator.compare);

      this.uniqueLastNames = instructors
        .map((instructor) => instructor.lastName)
        .filter(
          (lastName, idx, lastNames) => lastNames.indexOf(lastName) === idx
        )
        .sort((a, b) => {
          if (a == null || a == undefined) {
            return -1;
          } else if (b == null || b == undefined) {
            return 1;
          } else {
            return this.collator.compare(a, b);
          }
        });
    });
  }

  private nameSearchTerms = new Subject<string>();
  private firstNameSearchTerms = new Subject<string>();
  private fullNameSearchTerms = new Subject<string>();
  private lastNameSearchTerms = new Subject<string>();

  /**
   * Push a search term into the `Observable` stream
   *
   * @param term - a search term
   */
  searchByName(term: string): void {
    this.nameSearchTerms.next(term);
  }

  searchByFirstName(term: string): void {
    this.firstNameSearchTerms.next(term);
  }

  searchByFullName(term: string): void {
    this.fullNameSearchTerms.next(term);
  }

  searchByLastName(term: string): void {
    this.lastNameSearchTerms.next(term);
  }

  instructorsByName$!: Observable<Instructor[]>;
  instructorsByFirstName$!: Observable<Instructor[]>;
  instructorsByFullName$!: Observable<Instructor[]>;
  instructorsByLastName$!: Observable<Instructor[]>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly instructorService: InstructorService,
    private readonly instructorSearchService: InstructorSearchService
  ) {}

  ngOnInit(): void {
    // this.getInstructors()

    this.activatedRoute.data.subscribe(({ instructors }) => {
      this.instructors = instructors;

      this.uniqueFirstNames = (instructors as Instructor[])
        .map((instructor) => instructor.firstName)
        .filter(
          (firstName, idx, firstNames) => firstNames.indexOf(firstName) === idx
        )
        .sort(this.collator.compare);

      this.uniqueLastNames = (instructors as Instructor[])
        .map((instructor) => instructor.lastName)
        .filter(
          (lastName, idx, lastNames) => lastNames.indexOf(lastName) === idx
        )
        .sort((a, b) => {
          if (a == null) {
            return -1;
          } else if (b == null) {
            return 1;
          } else {
            return this.collator.compare(a, b);
          }
        });
    });

    this.instructorsByName$ = this.nameSearchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      // debounceTime(300),
      debounceTime(150),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // `switch` to new `search` `Observable` each time the `term` changes
      switchMap((term: string) =>
        this.instructorSearchService.searchInstructorsByName(term)
      )
    );

    this.instructorsByFirstName$ = this.firstNameSearchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      // debounceTime(300),
      // debounceTime(150),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // `switch` to new `search` `Observable` each time the `term` changes
      switchMap((term: string) =>
        this.instructorSearchService.getAllByFirstName(term)
      )
    );

    this.instructorsByFullName$ = this.fullNameSearchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      // debounceTime(300),
      debounceTime(150),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // `switch` to new `search` `Observable` each time the `term` changes
      switchMap((term: string) =>
        this.instructorSearchService.searchInstructorsByFullName(term)
      )
    );

    this.instructorsByLastName$ = this.lastNameSearchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      // debounceTime(300),
      // debounceTime(150),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // `switch` to new `search` `Observable` each time the `term` changes
      switchMap((term?: string) =>
        this.instructorSearchService.getAllByLastName(term)
      )
    );
  }
}
