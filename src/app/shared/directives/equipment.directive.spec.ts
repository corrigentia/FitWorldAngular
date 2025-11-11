import { EquipmentService } from 'src/app/equipment/services/equipment.service';
import {
  UniqueEquipmentValidator,
  UniqueEquipmentValidatorDirective,
} from './equipment.directive';
import { async, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { Logger } from '../services/logger.service';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
// import { inject } from '@angular/core';

describe('EquipmentDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });

  it('should create an instance', () => {
    const service = TestBed.inject(EquipmentService);

    const validator = new UniqueEquipmentValidator(service);

    const directive = new UniqueEquipmentValidatorDirective(validator);
    expect(directive).toBeTruthy();
  });
});
