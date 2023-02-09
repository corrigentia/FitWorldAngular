import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorFormReactiveComponent } from './instructor-form-reactive.component';

describe('InstructorFormReactiveComponent', () => {
  let component: InstructorFormReactiveComponent;
  let fixture: ComponentFixture<InstructorFormReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorFormReactiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorFormReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
