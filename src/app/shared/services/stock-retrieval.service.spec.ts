import { TestBed } from '@angular/core/testing';

import { StockRetrievalService } from './stock-retrieval.service';

describe('StockRetrievalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockRetrievalService = TestBed.get(StockRetrievalService);
    expect(service).toBeTruthy();
  });
});
