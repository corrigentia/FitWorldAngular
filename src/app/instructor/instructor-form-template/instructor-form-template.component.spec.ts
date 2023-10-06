import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorFormTemplateComponent } from './instructor-form-template.component';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('InstructorFormTemplateComponent', () => {
  let component: InstructorFormTemplateComponent;
  let fixture: ComponentFixture<InstructorFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorFormTemplateComponent],
      providers: [Logger],
      imports: [HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
