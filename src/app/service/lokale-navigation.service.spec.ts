import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LokaleNavigationService } from './lokale-navigation.service';

describe('LokaleNavigationService', () => {
  let service: LokaleNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
    service = TestBed.inject(LokaleNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
