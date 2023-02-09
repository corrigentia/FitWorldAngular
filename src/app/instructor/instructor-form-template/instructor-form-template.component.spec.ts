import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorFormTemplateComponent } from './instructor-form-template.component';

describe('InstructorFormTemplateComponent', () => {
  let component: InstructorFormTemplateComponent;
  let fixture: ComponentFixture<InstructorFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorFormTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
