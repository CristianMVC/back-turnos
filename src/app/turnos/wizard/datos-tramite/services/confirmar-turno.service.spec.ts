import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { TramitesService } from '../../../wizard/busqueda-tramite/services/tramites.service';
import { ReservaTurnoService } from '../../seleccion-turno/services/reserva-turno.service';
import { ConfirmarTurnoService } from './confirmar-turno.service';
import { HorariosDisponiblesService } from '../../../wizard/seleccion-turno/horarios-disponibles-turno/horarios-disponibles.service';
import { CancelarTurnoService } from '../../../shared/modal/modal-cancelar-turno/services/cancelar-turno.service';
import { TestHelper } from '../../../shared/testing/test-utilities';

describe('ConfirmarTurnoService', () => {

    let originalTimeout: number;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ReservaTurnoService, ConfirmarTurnoService, TramitesService, HorariosDisponiblesService,
            TestHelper, CancelarTurnoService],
            imports: [HttpModule]
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000; // tslint:disable-line:no-magic-numbers
    });

    it('should be created', inject([ConfirmarTurnoService], (service: ConfirmarTurnoService) => {
        expect(service).toBeTruthy();
    }));

    it('should confirmar turno', (done: DoneFn) => {
        const confirmService: ConfirmarTurnoService = TestBed.get(ConfirmarTurnoService);
        const cancelarTurnoService: CancelarTurnoService = TestBed.get(CancelarTurnoService);
        const helper: TestHelper = TestBed.get(TestHelper);
        helper.reservarTurno().subscribe((reservaResponse: ReservaTurnoResponse) => {
            const turno = helper.createTurno(reservaResponse);
            return confirmService.confirmarTurno(turno).subscribe(() => {
                return cancelarTurnoService.cancelarTurno(turno.codigo).subscribe(done);
            });
        }, (err: TurnosErrorSNT) => {
            if (helper.isTurnoFueraDeRangoDeAtencion(err.errors)) {
                done();
            } else {
                done.fail(err.errors.join(''));
            }
        });
    });

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
