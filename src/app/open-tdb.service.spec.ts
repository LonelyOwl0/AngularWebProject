import { TestBed } from '@angular/core/testing';

import { OpenTdbService } from './open-tdb.service';

describe('OpenTdbService', () => {
  let service: OpenTdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenTdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
