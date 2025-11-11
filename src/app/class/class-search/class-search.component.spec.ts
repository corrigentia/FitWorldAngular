import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSearchComponent } from './class-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ClassSearchComponent', () => {
  let component: ClassSearchComponent;
  let fixture: ComponentFixture<ClassSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ClassSearchComponent],
    imports: [RouterTestingModule, FormsModule],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(ClassSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
