import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth-interceptor.interceptor';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AuthInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
    imports: [],
    providers: [AuthInterceptor, Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
  );

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
