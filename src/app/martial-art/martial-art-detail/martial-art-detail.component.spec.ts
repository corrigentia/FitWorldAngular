import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MartialArtDetailComponent } from './martial-art-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MartialArtDetailComponent', () => {
  let component: MartialArtDetailComponent;
  let fixture: ComponentFixture<MartialArtDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [MartialArtDetailComponent],
    imports: [RouterTestingModule],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(MartialArtDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
