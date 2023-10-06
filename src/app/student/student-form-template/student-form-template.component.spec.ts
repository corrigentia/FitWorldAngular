import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFormTemplateComponent } from './student-form-template.component';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('StudentFormTemplateComponent', () => {
  let component: StudentFormTemplateComponent;
  let fixture: ComponentFixture<StudentFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentFormTemplateComponent],
      providers: [Logger],
      imports: [HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
