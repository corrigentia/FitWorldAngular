import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Logger } from '../../services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Logger],
      imports: [HttpClientTestingModule],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
