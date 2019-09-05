import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { TramitesService } from '../../../wizard/busqueda-tramite/services/tramites.service';
import { FormularioTramiteService } from './formulario-tramite.service';

describe('FormularioTramiteService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FormularioTramiteService, TramitesService],
            imports: [HttpModule]
        });
    });

    it('should be created', inject([FormularioTramiteService], (service: FormularioTramiteService) => {
        expect(service).toBeTruthy();
    }));

    it('should get formulario by tramite', (done: DoneFn) => {
        const service: FormularioTramiteService = TestBed.get(FormularioTramiteService);
        const tramiteService: TramitesService = TestBed.get(TramitesService);
        tramiteService.getTramites([]).subscribe((results: TurnosTramitesPaginables) => {
            return service.getFormularioByTramiteId(results.tramites[0].id).subscribe((formulario: Formulario) => {
                // tslint:disable-next-line:no-magic-numbers
                expect(formulario.fields.length).toBeGreaterThan(0);
                done();
            });
        }, ((err: Error) => {
            done.fail(err);
        }));
    });

});
