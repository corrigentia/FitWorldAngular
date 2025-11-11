import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDetailComponent } from './instructor-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('InstructorDetailComponent', () => {
  let component: InstructorDetailComponent;
  let fixture: ComponentFixture<InstructorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [InstructorDetailComponent],
    imports: [RouterTestingModule],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(InstructorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
