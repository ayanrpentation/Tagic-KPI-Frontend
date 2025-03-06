import { TestBed } from '@angular/core/testing';

import { SessionTimeOutInterceptor } from './session-time-out.interceptor';

describe('SessionTimeOutInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SessionTimeOutInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SessionTimeOutInterceptor = TestBed.inject(SessionTimeOutInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
