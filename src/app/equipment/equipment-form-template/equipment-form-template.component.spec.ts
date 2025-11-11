import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentFormTemplateComponent } from './equipment-form-template.component';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EquipmentFormTemplateComponent', () => {
  let component: EquipmentFormTemplateComponent;
  let fixture: ComponentFixture<EquipmentFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [EquipmentFormTemplateComponent],
    imports: [FormsModule],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(EquipmentFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
