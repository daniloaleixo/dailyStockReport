import { TestBed } from '@angular/core/testing';

import { AlphaAdvantageService } from './alpha-advantage.service';

describe('AlphaAdvantageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlphaAdvantageService = TestBed.get(AlphaAdvantageService);
    expect(service).toBeTruthy();
  });
});
