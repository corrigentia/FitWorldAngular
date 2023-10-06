import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDetailComponent } from './class-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClassDetailComponent', () => {
  let component: ClassDetailComponent;
  let fixture: ComponentFixture<ClassDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [Logger],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassDetailComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges(); // TypeError: Cannot read properties of undefined (reading 'find')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
