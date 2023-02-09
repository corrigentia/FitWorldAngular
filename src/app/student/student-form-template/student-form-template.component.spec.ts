import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFormTemplateComponent } from './student-form-template.component';

describe('StudentFormTemplateComponent', () => {
  let component: StudentFormTemplateComponent;
  let fixture: ComponentFixture<StudentFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentFormTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
