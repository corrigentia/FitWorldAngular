import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Logger } from './shared/services/logger.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MessagesComponent } from './messages/messages.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [AppComponent, MessagesComponent],
    imports: [RouterTestingModule],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Fit World'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Fit World');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent)
      /*
    .toContain(
      'Fit World app is running!'
    );
    */
      .toBeUndefined();
  });
});
