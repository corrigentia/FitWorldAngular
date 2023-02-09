import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassFormReactiveComponent } from './class-form-reactive.component';

describe('ClassFormReactiveComponent', () => {
  let component: ClassFormReactiveComponent;
  let fixture: ComponentFixture<ClassFormReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassFormReactiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassFormReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
