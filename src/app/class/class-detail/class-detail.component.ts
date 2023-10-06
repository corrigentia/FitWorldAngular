import { Location } from '@angular/common';
import {
  AfterContentChecked,
  // AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class } from 'src/app/interfaces/class';
import { Instructor } from 'src/app/interfaces/instructor';
import { MartialArt } from 'src/app/interfaces/martial-art';
import { ClassService } from '../services/class.service';
import { InstructorService } from 'src/app/instructor/services/instructor.service';
import { Logger } from 'src/app/shared/services/logger.service';
import { MartialArtService } from 'src/app/martial-art/services/martial-art.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { Class as ClassClass } from 'src/app/models/class';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css'],
  // providers: [ClassService], // TODO: analyze what it would do differently
})
// AfterContentInit,
export class ClassDetailComponent
  implements
    OnInit,
    OnChanges,
    AfterViewInit,
    AfterViewChecked,
    AfterContentChecked
{
  // protected martialArts: MartialArt[] = [{} as MartialArt]; // did NOT work either to fix the test
  protected martialArts: MartialArt[] = [];
  protected instructors: Instructor[] = [];

  @Input() martialArtClass?: Class;

  protected martialArtName?: string;
  protected instructor?: Instructor;
  protected instructorFirstName?: string;
  protected instructorLastName?: string;
  protected instructorFullName?: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly route: ActivatedRoute,
    private readonly logger: Logger,
    private readonly messageService: MessageService,
    private readonly classService: ClassService,
    private readonly martialArtService: MartialArtService,
    private readonly instructorService: InstructorService,
    private readonly location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.martialArtClass) {
      this.classService
        .updateEntity(
          this.martialArtClass
          /*
          new ClassClass(
            this.martialArtClass.martialArt.id,
            this.martialArtClass.instructor.id,
            this.martialArtClass.dateTime,
            this.martialArtClass.pricePerHour
          )
          */
          /*
          {
          martialArtId: this.martialArtClass.martialArt.id,
          instructorId: this.martialArtClass.instructor.id,
          dateTime: this.martialArtClass.dateTime,
          pricePerHour: this.martialArtClass.pricePerHour,
        }
        */
        )
        .subscribe(() => this.goBack());
    }
  }

  getClass(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.classService
      .getEntity(id)
      .subscribe((martialArtClass) => (this.martialArtClass = martialArtClass));
  }

  getMartialArts(): void {
    this.martialArtService
      .getMartialArts()
      .subscribe((martialArts) => (this.martialArts = martialArts));
  }

  // 02/02/2023
  // TODO: martialArtIdValidator for martialArtClass
  // TODO: instructorIdValidator for martialArtClass

  getInstructors(): void {
    this.instructorService
      .getInstructors()
      .subscribe((instructors) => (this.instructors = instructors));
  }

  protected aliasMartialArt(id: number): string {
    return (
      this.martialArts.find((martialArt) => martialArt.id === id)?.name ??
      'invalid martial art'
    );
  }

  protected aliasInstructor(id: number): string {
    const instructor = this.instructors.find(
      (instructor) => instructor.id === id
    );
    return (
      instructor?.firstName.concat(' '.concat(instructor.lastName ?? '')) ??
      'invalid instructor'
    );
  }

  ngOnInit(): void {
    // this.getClass();
    /*
    console.log('this.activatedRoute.data', this.activatedRoute.data)
    console.log('this.activatedRoute.data', this.activatedRoute.data.subscribe(data => console.log(
      'data', data)))
    */

    /*
    this.activatedRoute.data.subscribe(data => console.log(
      'data', data))
    */

    this.activatedRoute.data.subscribe((data) =>
      console.log('data', JSON.stringify(data))
    );

    // this.activatedRoute.data.subscribe(({ martialArtClass }) => {
    this.activatedRoute.data.subscribe(
      ({ instructors, martialArts, martialArtClass }) => {
        // do something with your resolved data...

        /*
      console.log(JSON.stringify(martialArtClass))
      console.log(JSON.stringify((martialArtClass as Class)))
      console.log(JSON.stringify((martialArtClass as Class).id))
      */
        this.instructors = instructors;
        this.martialArts = martialArts;
        // this.martialArtClass = martialArtClass as Class
        this.martialArtClass = martialArtClass;
      }
    );
    // this.getInstructors();
    // this.getMartialArts();
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log('after content init');
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log('after view init');
    // this.getClass();
    // this.getInstructors()
    // this.getMartialArts()
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    console.log('changes:', changes);
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    console.log('after content checked');

    /*
    this.martialArtName =
      this.martialArts.find(
        (martialArt) =>
          martialArt.id === this.martialArtClass?.martialArtId
      )?.name ?? 'invalid martial art';
    */
  }

  // 03/02/2023
  // TODO: search equipment by name & price select options
  // TODO: search classes by select options
  // TODO: fix error NG0100: Expression has changed after it was checked

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    console.log('after view checked');

    // this.martialArtName =
    const martialArt = this.martialArts.find(
      // TODO: calling find (on undefined !?!) fails the karma spec/test
      // martialArt => martialArt.id === this.martialArtClass?.martialArtId
      (martialArt) => martialArt.id === this.martialArtClass?.martialArt.id
    ); //?.name ?? 'invalid martial art';

    this.martialArtName = martialArt?.name ?? 'invalid martial art';

    this.instructor = this.instructors.find(
      // instructor => instructor.id === this.martialArtClass?.instructorId
      (instructor) => instructor.id === this.martialArtClass?.instructor.id
    );

    this.instructorFirstName =
      this.instructor?.firstName ?? 'invalid instructor';
    this.instructorLastName = this.instructor?.lastName ?? 'invalid instructor';

    this.instructorFullName =
      this.instructor?.firstName.concat(
        ' '.concat(this.instructor.lastName ?? '')
      ) ?? 'invalid instructor';
  }
}
