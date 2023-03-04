import { TestBed } from '@angular/core/testing';

import { GetStocksService } from './get-stocks.service';

describe('GetStocksService', () => {
  let service: GetStocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetStocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
