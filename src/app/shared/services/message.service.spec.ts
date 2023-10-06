import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { Logger } from './logger.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Logger],
    });
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
