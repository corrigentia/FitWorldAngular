import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MartialArtSearchComponent } from './martial-art-search.component';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MartialArtSearchComponent', () => {
  let component: MartialArtSearchComponent;
  let fixture: ComponentFixture<MartialArtSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [MartialArtSearchComponent],
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(MartialArtSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
