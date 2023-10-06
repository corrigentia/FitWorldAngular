import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSearchComponent } from './class-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('ClassSearchComponent', () => {
  let component: ClassSearchComponent;
  let fixture: ComponentFixture<ClassSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassSearchComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [Logger],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
