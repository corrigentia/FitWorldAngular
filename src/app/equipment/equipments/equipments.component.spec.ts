import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentsComponent } from './equipments.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EquipmentsComponent', () => {
  let component: EquipmentsComponent;
  let fixture: ComponentFixture<EquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [Logger],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
