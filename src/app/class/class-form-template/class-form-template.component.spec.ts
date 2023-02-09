import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassFormTemplateComponent } from './class-form-template.component';

describe('ClassFormTemplateComponent', () => {
  let component: ClassFormTemplateComponent;
  let fixture: ComponentFixture<ClassFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassFormTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
