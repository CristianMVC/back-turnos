import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { TramitesService } from '../../../wizard/busqueda-tramite/services/tramites.service';
import { HorizonteTramiteService } from './horizonte-tramite.service';

describe('HorizonteTramiteService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HorizonteTramiteService, TramitesService ],
            imports: [HttpModule]
        });
    });

    it('should be created', inject([HorizonteTramiteService], (service: HorizonteTramiteService) => {
        expect(service).toBeTruthy();
    }));

    it('should get horizonte per tramite', (done: DoneFn) => {
        const service: HorizonteTramiteService = TestBed.get(HorizonteTramiteService);
        const tramiteService: TramitesService = TestBed.get(TramitesService);
        tramiteService.getTramites([]).subscribe((results: TurnosTramitesPaginables) => {
            // tslint:disable-next-line:no-magic-numbers
            return service.getHorizonteTramite(/*TODO: restore results.tramites[0].id*/ 26).subscribe((horizonte: number) => {
                expect(horizonte).toBeGreaterThan(0);
                done();
            });
        }, ((err: Error) => {
            done.fail(err);
        }));
    });
});
