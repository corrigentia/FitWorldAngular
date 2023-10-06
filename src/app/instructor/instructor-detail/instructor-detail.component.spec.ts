import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDetailComponent } from './instructor-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InstructorDetailComponent', () => {
  let component: InstructorDetailComponent;
  let fixture: ComponentFixture<InstructorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [Logger],
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
