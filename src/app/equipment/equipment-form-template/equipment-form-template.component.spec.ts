import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentFormTemplateComponent } from './equipment-form-template.component';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('EquipmentFormTemplateComponent', () => {
  let component: EquipmentFormTemplateComponent;
  let fixture: ComponentFixture<EquipmentFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentFormTemplateComponent],
      imports: [HttpClientTestingModule,FormsModule],
      providers: [Logger],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
