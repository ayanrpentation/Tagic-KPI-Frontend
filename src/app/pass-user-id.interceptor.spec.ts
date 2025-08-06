import { TestBed } from '@angular/core/testing';

import { PassUserIdInterceptor } from './pass-user-id.interceptor';

describe('PassUserIdInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PassUserIdInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PassUserIdInterceptor = TestBed.inject(PassUserIdInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
