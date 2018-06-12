import { TestBed, inject } from '@angular/core/testing';

import { ConciliacaoServiceService } from './conciliacao-service.service';

describe('ConciliacaoServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConciliacaoServiceService]
    });
  });

  it('should be created', inject([ConciliacaoServiceService], (service: ConciliacaoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
