import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { StudentIdEmail } from 'src/app/interfaces/student-id-email';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.css'],
})
export class StudentSearchComponent implements OnInit {
  // private searchTerms = new Subject();
  // distinctUntilChanged() complains otherwise
  private searchTerms = new Subject<string>();

  /**
   * Push a search term into the `Observable` stream
   *
   * @param term - a search term
   */
  search(term: string): void {
    this.searchTerms.next(term);
  }

  // students$!: Observable<StudentIdEmail>;
  // must be the same type as the return type of studentService.searchStudents() because of the assignment/initialisation in ngOnInit()
  students$!: Observable<StudentIdEmail[]>;

  /**
   *
   */
  constructor(private readonly studentService: StudentService) {
    // super();
  }

  ngOnInit(): void {
    this.students$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      // debounceTime(300),
      debounceTime(150),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // `switch` to new `search` `Observable` each time the `term` changes
      switchMap((term: string) => this.studentService.searchStudents(term))
    );
  }
}
