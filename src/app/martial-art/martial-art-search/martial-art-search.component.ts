import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MartialArt } from 'src/app/interfaces/martial-art';
import { MartialArtService } from 'src/app/martial-art/services/martial-art.service';

@Component({
  selector: 'app-martial-art-search',
  templateUrl: './martial-art-search.component.html',
  styleUrls: ['./martial-art-search.component.css'],
})
export class MartialArtSearchComponent implements OnInit {
  private searchTerms = new Subject<string>();

  /**
   * Push a search term into the `Observable` stream
   *
   * @param term - a search term
   */
  search(term: string): void {
    this.searchTerms.next(term);
  }

  martialArts$!: Observable<MartialArt[]>;

  constructor(private readonly martialArtService: MartialArtService) {}

  ngOnInit(): void {
    this.martialArts$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      // debounceTime(300),
      debounceTime(150),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // `switch` to new `search` `Observable` each time the `term` changes
      switchMap((term: string) =>
        this.martialArtService.searchMartialArts(term)
      )
    );
  }
}
