import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { TramitesService } from '../../../wizard/busqueda-tramite/services/tramites.service';
import { RequisitosTramiteService } from './requisitos-tramite.service';

describe('RequisitosTramiteService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RequisitosTramiteService, TramitesService],
            imports: [HttpModule]
        });
    });

    it('should be created', inject([RequisitosTramiteService], (service: RequisitosTramiteService) => {
        expect(service).toBeTruthy();
    }));

    it('should get requisitos per tramite', (done: DoneFn) => {
        const service: RequisitosTramiteService = TestBed.get(RequisitosTramiteService);
        const tramiteService: TramitesService = TestBed.get(TramitesService);
        tramiteService.getTramites([]).subscribe((results: TurnosTramitesPaginables) => {
            return service.getRequisitosByTramiteId(results.tramites[0].id).subscribe((requisitos: Requisito[]) => {
                expect(requisitos.length).toBeGreaterThan(0);
                done();
            });
        }, ((err: Error) => {
            done.fail(err);
        }));
    });

});
