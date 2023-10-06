import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Instructor } from 'src/app/interfaces/instructor';
import { InstructorService } from 'src/app/instructor/services/instructor.service';

@Component({
  selector: 'app-instructor-detail',
  templateUrl: './instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.css'],
})
export class InstructorDetailComponent implements OnInit {
  @Input() instructor?: Instructor;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly instructorService: InstructorService,
    private readonly location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.instructor) {
      this.instructorService
        .updateEntity(this.instructor)
        .subscribe(() => this.goBack());
    }
  }

  getInstructor(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.instructorService
      .getEntity(id)
      .subscribe((instructor) => (this.instructor = instructor));
  }

  ngOnInit(): void {
    this.getInstructor();
  }
}
