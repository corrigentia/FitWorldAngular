import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSearchComponent } from './student-search.component';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('StudentSearchComponent', () => {
  let component: StudentSearchComponent;
  let fixture: ComponentFixture<StudentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [StudentSearchComponent],
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(StudentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
