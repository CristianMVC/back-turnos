import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { TramitesService } from '../../../wizard/busqueda-tramite/services/tramites.service';
import { ReservaTurnoService } from './reserva-turno.service';
import { HorariosDisponiblesService } from '../../../wizard/seleccion-turno/horarios-disponibles-turno/horarios-disponibles.service';
import { ConfirmarTurnoService } from '../../../wizard/datos-tramite/services/confirmar-turno.service';
import { TestHelper } from '../../../shared/testing/test-utilities';

describe('ReservaTurnoService', () => {

    let originalTimeout: number;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ReservaTurnoService, TramitesService, HorariosDisponiblesService,
                 ConfirmarTurnoService, TestHelper],
            imports: [HttpModule]
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000; // tslint:disable-line:no-magic-numbers
    });

    it('should be created', inject([ReservaTurnoService], (service: ReservaTurnoService) => {
        expect(service).toBeTruthy();
    }));

    it('should reserva turno', (done: DoneFn) => {
        const helper: TestHelper = TestBed.get(TestHelper);
        helper.getTramites().subscribe((results: TurnosTramitesPaginables) => {
            helper.reservarTurno().subscribe((reservaResponse: ReservaTurnoResponse) => {
                expect(reservaResponse.codigo).not.toBeNull();
                expect(reservaResponse.turnoId).toBeGreaterThan(0);
                done();
            }, ((err: TurnosErrorSNT) => {
                if (helper.isTurnoFueraDeRangoDeAtencion(err.errors)) {
                    done();
                } else {
                    done.fail(err.errors.join(''));
                }
            }));
        });
    });

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});
