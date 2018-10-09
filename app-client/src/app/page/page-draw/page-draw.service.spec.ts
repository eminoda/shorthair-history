import { TestBed } from '@angular/core/testing';

import { PageDrawService } from './page-draw.service';

describe('PageDrawService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageDrawService = TestBed.get(PageDrawService);
    expect(service).toBeTruthy();
  });
});
