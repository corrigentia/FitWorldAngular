import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentSearchComponent } from './equipment-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('EquipmentSearchComponent', () => {
  let component: EquipmentSearchComponent;
  let fixture: ComponentFixture<EquipmentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentSearchComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [Logger],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
