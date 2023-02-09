import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFormReactiveComponent } from './student-form-reactive.component';

describe('StudentFormReactiveComponent', () => {
  let component: StudentFormReactiveComponent;
  let fixture: ComponentFixture<StudentFormReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentFormReactiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentFormReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
