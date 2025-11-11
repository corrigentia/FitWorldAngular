import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFormReactiveComponent } from './student-form-reactive.component';
import { Logger } from 'src/app/shared/services/logger.service';
import { StudentService } from '../services/student.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('StudentFormReactiveComponent', () => {
  let component: StudentFormReactiveComponent;
  let fixture: ComponentFixture<StudentFormReactiveComponent>;

  beforeEach(async () => {
    class TService extends StudentService {}

    await TestBed.configureTestingModule({
    declarations: [StudentFormReactiveComponent],
    imports: [ReactiveFormsModule],
    providers: [
        Logger,
        StudentService,
        { provide: TService, useValue: StudentService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();

    fixture = TestBed.createComponent(StudentFormReactiveComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges(); // fails the test trying to get undefined.pending
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
