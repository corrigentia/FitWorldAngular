import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSearchComponent } from './student-search.component';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StudentSearchComponent', () => {
  let component: StudentSearchComponent;
  let fixture: ComponentFixture<StudentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentSearchComponent],
      imports: [HttpClientTestingModule],
      providers: [Logger],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
