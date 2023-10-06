import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MartialArtSearchComponent } from './martial-art-search.component';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MartialArtSearchComponent', () => {
  let component: MartialArtSearchComponent;
  let fixture: ComponentFixture<MartialArtSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MartialArtSearchComponent],
      providers: [Logger],imports:[HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MartialArtSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
