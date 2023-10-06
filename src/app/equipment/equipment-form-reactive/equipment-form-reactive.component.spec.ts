import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentFormReactiveComponent } from './equipment-form-reactive.component';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('EquipmentFormReactiveComponent', () => {
  let component: EquipmentFormReactiveComponent;
  let fixture: ComponentFixture<EquipmentFormReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentFormReactiveComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [Logger],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentFormReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
