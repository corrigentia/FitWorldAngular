import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassFormTemplateComponent } from './class-form-template.component';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ClassFormTemplateComponent', () => {
  let component: ClassFormTemplateComponent;
  let fixture: ComponentFixture<ClassFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ClassFormTemplateComponent],
    imports: [FormsModule],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(ClassFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
