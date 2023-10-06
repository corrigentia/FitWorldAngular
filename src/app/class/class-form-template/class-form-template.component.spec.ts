import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassFormTemplateComponent } from './class-form-template.component';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('ClassFormTemplateComponent', () => {
  let component: ClassFormTemplateComponent;
  let fixture: ComponentFixture<ClassFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassFormTemplateComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [Logger],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
