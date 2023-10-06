import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesComponent } from './classes.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('ClassesComponent', () => {
  let component: ClassesComponent;
  let fixture: ComponentFixture<ClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassesComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [Logger],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
