import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorFormTemplateComponent } from './instructor-form-template.component';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('InstructorFormTemplateComponent', () => {
  let component: InstructorFormTemplateComponent;
  let fixture: ComponentFixture<InstructorFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [InstructorFormTemplateComponent],
    imports: [FormsModule],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(InstructorFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
