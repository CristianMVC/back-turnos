import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { BusquedaTurnoService } from './busqueda-turno.service';

import { TramitesService } from '../../wizard/busqueda-tramite/services/tramites.service';
import { ReservaTurnoService } from '../../wizard/seleccion-turno/services/reserva-turno.service';
import { ConfirmarTurnoService } from '../../wizard/datos-tramite/services/confirmar-turno.service';
import { HorariosDisponiblesService } from '../../wizard/seleccion-turno/horarios-disponibles-turno/horarios-disponibles.service';
import { TestHelper, ConfirmacionResponse } from '../../shared/testing/test-utilities';
import { CancelarTurnoService } from '../../shared/modal/modal-cancelar-turno/services/cancelar-turno.service';

describe('BusquedaTurnoService', () => {

    let originalTimeout: number;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BusquedaTurnoService,
                TramitesService,
                ReservaTurnoService,
                ConfirmarTurnoService,
                HorariosDisponiblesService,
                TestHelper,
                CancelarTurnoService],
            imports: [HttpModule]
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 80000; // tslint:disable-line:no-magic-numbers
    });

    it('should be created', inject([BusquedaTurnoService], (service: BusquedaTurnoService) => {
        expect(service).toBeTruthy();
    }));

    it('should get http 400 when turno does not exist', (done: DoneFn) => {
        const service: BusquedaTurnoService = TestBed.get(BusquedaTurnoService);
        service.buscarTurno('27143752378', 'anyCodee').subscribe((resultado: ResultadoBusquedaTurno) => {
            done.fail();
        }, ((err: Error) => {
            done();
        }));
    });

    it('should get turno by cuil and codigo', (done: DoneFn) => {
        const service: BusquedaTurnoService = TestBed.get(BusquedaTurnoService);
        const cancelarTurnoService: CancelarTurnoService = TestBed.get(CancelarTurnoService);
        const helper: TestHelper = TestBed.get(TestHelper);
        helper.confirmarTurno().subscribe((result: ConfirmacionResponse) => {
            service.buscarTurno(result.cuil, result.codigo).subscribe((resultado: ResultadoBusquedaTurno) => {
                expect(resultado.id).not.toBeUndefined();
                expect(resultado.codigo).not.toBeUndefined();
                cancelarTurnoService.cancelarTurno(resultado.codigo).subscribe(() => {
                    done();
                });
            }, ((err: Error) => {
                cancelarTurnoService.cancelarTurno(result.codigo).subscribe(() => {
                    done.fail(err);
                });
            }));
        }, ((err: TurnosErrorSNT) => {
            if (helper.isTurnoFueraDeRangoDeAtencion(err.errors)) {
                done();
            } else {
                done.fail(err.errors.join(''));
            }
        }))
    });

    afterEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});




