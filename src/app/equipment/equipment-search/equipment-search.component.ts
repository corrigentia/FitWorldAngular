import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Equipment } from 'src/app/interfaces/equipment';
import { EquipmentService } from 'src/app/equipment/services/equipment.service';
import { EquipmentSearchService } from './services/equipment-search.service';

@Component({
    selector: 'app-equipment-search',
    templateUrl: './equipment-search.component.html',
    standalone: false
})
export class EquipmentSearchComponent implements OnInit {
  protected equipments: Equipment[] = [];
  protected priceSought!: number;
  protected nameSought!: string;

  protected uniqueNames!: string[];
  protected uniquePrices!: number[];

  private readonly collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
  });

  getAll(): void {
    this.equipmentService.getEquipments(0, 99999).subscribe((equipments) => {
      this.equipments = equipments;

      this.uniqueNames = equipments
        .map((equipment) => equipment.name)
        .filter((name, idx, names) => names.indexOf(name) === idx)
        .sort(this.collator.compare);

      this.uniquePrices = equipments
        .map((equipment) => equipment.price)
        .filter((price, idx, prices) => prices.indexOf(price) === idx)
        .sort((a, b) => a - b);
    });
  }

  private nameSearchTerms = new Subject<string>();
  private priceSearchTerms = new Subject<number>();

  /**
   * Push a search term into the `Observable` stream
   *
   * @param term - a search term
   */
  searchByName(term: string): void {
    this.nameSearchTerms.next(term);
  }

  searchByPrice(price: number): void {
    this.priceSearchTerms.next(price);
  }

  searchByNameSync(name: string): void {
    this.equipmentsByName$ = of(
      this.equipments.filter((equipment) => equipment.name === name)
    );
  }

  searchByPriceSync(price: number): void {
    this.equipmentsByPrice$ = of(
      this.equipments.filter((equipment) => equipment.price === price)
    );
  }

  equipmentsByName$!: Observable<Equipment[]>;
  equipmentsByPrice$!: Observable<Equipment[]>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly equipmentService: EquipmentService,
    private readonly equipmentSearchService: EquipmentSearchService
  ) {}

  ngOnInit(): void {
    // this.getAll();

    this.activatedRoute.data.subscribe(({ equipments }) => {
      this.equipments = equipments;

      this.uniqueNames = (equipments as Equipment[])
        .map((equipment) => equipment.name)
        .filter((name, idx, names) => names.indexOf(name) === idx)
        .sort(this.collator.compare);

      this.uniquePrices = (equipments as Equipment[])
        .map((equipment) => equipment.price)
        .filter((price, idx, prices) => prices.indexOf(price) === idx)
        .sort((a, b) => a - b);
    });

    this.equipmentsByName$ = this.nameSearchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      // debounceTime(300),
      // debounceTime(150),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // `switch` to new `search` `Observable` each time the `term` changes
      switchMap((name: string) =>
        this.equipmentSearchService.getAllByName(name)
      )
    );

    this.equipmentsByPrice$ = this.priceSearchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      // debounceTime(300),
      // debounceTime(150),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // `switch` to new `search` `Observable` each time the `term` changes
      switchMap((price: number) =>
        this.equipmentSearchService.getAllByPrice(price)
      )
    );
  }
}
