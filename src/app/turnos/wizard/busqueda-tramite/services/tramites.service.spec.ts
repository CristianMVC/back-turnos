import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { TramitesService } from './tramites.service';

describe('TramitesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TramitesService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([TramitesService], (service: TramitesService) => {
    expect(service).toBeTruthy();
  }));

  it('should not get tramites with keyword mismatch', (done: DoneFn) => {
    const service: TramitesService = TestBed.get(TramitesService);
    const keywords: string[] = ['invalidKeyword'];
    service.getTramites(keywords).subscribe((results: TurnosTramitesPaginables) => {
      expect(results.size).toEqual(0);
      expect(results.tramites.length).toEqual(0);
      done();
    }, ((err: Error) => {
      done.fail(err);
    }));
  });

  it('tramites result should match limit parameter', (done: DoneFn) => {
    const service: TramitesService = TestBed.get(TramitesService);
    const keywords: string[] = [];
    service.getTramites(keywords).subscribe((results: TurnosTramitesPaginables) => {
      if (results.size > 0) {
        expect(results.tramites.length).toEqual(service.getLimit());
      }
      done();
    }, ((err: Error) => {
      done.fail(err);
    }));
  });


  it('should get all tramites', (done: DoneFn) => {
    const service: TramitesService = TestBed.get(TramitesService);
    const keywords: string[] = [];
    service.getTramites(keywords).subscribe((results: TurnosTramitesPaginables) => {
      expect(results.tramites.length).not.toBeGreaterThan(service.getLimit());
      done();
    }, ((err: Error) => {
      done.fail(err);
    }));
  });

});
