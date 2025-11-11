import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentFormReactiveComponent } from './equipment-form-reactive.component';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EquipmentFormReactiveComponent', () => {
  let component: EquipmentFormReactiveComponent;
  let fixture: ComponentFixture<EquipmentFormReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [EquipmentFormReactiveComponent],
    imports: [ReactiveFormsModule],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(EquipmentFormReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
