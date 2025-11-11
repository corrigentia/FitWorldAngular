import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Logger } from '../shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { StudentSearchComponent } from '../student/student-search/student-search.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [DashboardComponent, StudentSearchComponent],
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
