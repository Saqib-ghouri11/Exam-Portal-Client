import { TestBed } from '@angular/core/testing';

import { PreventLoggedinAccessGuard } from './prevent-loggedin-access.guard';

describe('PreventLoggedinAccessGuard', () => {
  let guard: PreventLoggedinAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventLoggedinAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
