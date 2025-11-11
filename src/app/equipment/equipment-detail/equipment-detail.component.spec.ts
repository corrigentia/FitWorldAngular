import { Logger } from './../../shared/services/logger.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentDetailComponent } from './equipment-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EquipmentDetailComponent', () => {
  let component: EquipmentDetailComponent;
  let fixture: ComponentFixture<EquipmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [EquipmentDetailComponent],
    imports: [RouterTestingModule],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(EquipmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
