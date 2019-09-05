import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { TestHelper } from '../../../../shared/testing/test-utilities';
import { TramitesService } from '../../../../wizard/busqueda-tramite/services/tramites.service';
import { CancelarTurnoService } from './cancelar-turno.service';
import { ReservaTurnoService } from '../../../../wizard/seleccion-turno/services/reserva-turno.service';
import { HorariosDisponiblesService } from '../../../../wizard/seleccion-turno/horarios-disponibles-turno/horarios-disponibles.service';
import { ConfirmarTurnoService } from '../../../../wizard/datos-tramite/services/confirmar-turno.service';

describe('CancelarTurnoService', () => {

  let originalTimeout: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CancelarTurnoService,
        TramitesService,
        ReservaTurnoService,
        HorariosDisponiblesService,
        ConfirmarTurnoService,
        TestHelper
      ],
      imports: [HttpModule]
    });

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000; // tslint:disable-line:no-magic-numbers
  });

  it('should be created', inject([CancelarTurnoService], (service: CancelarTurnoService) => {
    expect(service).toBeTruthy();
  }));

  it('should cancel a turno', (done: DoneFn) => {
    const service: CancelarTurnoService = TestBed.get(CancelarTurnoService);
    const helper: TestHelper = TestBed.get(TestHelper);
    helper.reservarTurno().subscribe((response: ReservaTurnoResponse) => {
      service.cancelarTurno(response.codigo).subscribe(() => {
        done();
      }, (err: Error) => {
        done.fail(err);
      })
    }, ((err: TurnosErrorSNT) => {
      if (helper.isTurnoFueraDeRangoDeAtencion(err.errors)) {
        done();
      } else {
        done.fail(err.errors.join(''));
      }
    }));
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

});
