import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [LogInComponent],
    imports: [ReactiveFormsModule],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
