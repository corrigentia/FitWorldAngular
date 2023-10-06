import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorSearchComponent } from './instructor-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('InstructorSearchComponent', () => {
  let component: InstructorSearchComponent;
  let fixture: ComponentFixture<InstructorSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorSearchComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [Logger],
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
