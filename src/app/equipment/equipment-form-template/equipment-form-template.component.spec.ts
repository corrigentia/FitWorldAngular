import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentFormTemplateComponent } from './equipment-form-template.component';

describe('EquipmentFormTemplateComponent', () => {
  let component: EquipmentFormTemplateComponent;
  let fixture: ComponentFixture<EquipmentFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentFormTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
