import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MartialArtsComponent } from './martial-arts.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MartialArtsComponent', () => {
  let component: MartialArtsComponent;
  let fixture: ComponentFixture<MartialArtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MartialArtsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [Logger],
    }).compileComponents();

    fixture = TestBed.createComponent(MartialArtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
