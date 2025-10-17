// FILE: src/app/services/yelp.service.spec.ts
// Dependencies: Tests YelpService HTTP configuration using HttpClientTestingModule; executed by Karma.

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { YelpService } from './yelp.service';

describe('YelpService', () => {
  let service: YelpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(YelpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call search endpoint', () => {
    service.search('Boston, MA', 'distance').subscribe();

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/yelp/search?location=Boston%2C%20MA&sort_by=distance`
    );
    expect(req.request.method).toBe('GET');
  });
});
