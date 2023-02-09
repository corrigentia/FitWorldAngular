import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentFormReactiveComponent } from './equipment-form-reactive.component';

describe('EquipmentFormReactiveComponent', () => {
  let component: EquipmentFormReactiveComponent;
  let fixture: ComponentFixture<EquipmentFormReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentFormReactiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentFormReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
