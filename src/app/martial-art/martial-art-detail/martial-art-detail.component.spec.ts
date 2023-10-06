import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MartialArtDetailComponent } from './martial-art-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MartialArtDetailComponent', () => {
  let component: MartialArtDetailComponent;
  let fixture: ComponentFixture<MartialArtDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MartialArtDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [Logger],
    }).compileComponents();

    fixture = TestBed.createComponent(MartialArtDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
