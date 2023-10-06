import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsComponent } from './instructors.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InstructorsComponent', () => {
  let component: InstructorsComponent;
  let fixture: ComponentFixture<InstructorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [Logger],
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
