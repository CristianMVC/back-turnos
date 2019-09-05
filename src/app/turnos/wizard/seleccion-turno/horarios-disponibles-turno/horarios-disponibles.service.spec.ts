import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import * as moment from 'moment';

import { HorariosDisponiblesService } from './horarios-disponibles.service';

describe('HorarioDisponiblesService', () => {

    let originalTimeout: number;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HorariosDisponiblesService],
            imports: [HttpModule]
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000; // tslint:disable-line:no-magic-numbers
    });

    it('should be created', inject([HorariosDisponiblesService], (service: HorariosDisponiblesService) => {
        expect(service).toBeTruthy();
    }));

    it('should get horarios', (done: DoneFn) => {
        const service: HorariosDisponiblesService = TestBed.get(HorariosDisponiblesService);
        const tramiteId = 31;
        const puntoAtencion = { id: 8 } as TurnosPuntoAtencion
        service.getHorarios(tramiteId, moment(), puntoAtencion).subscribe((results: Horario[]) => {
            expect(results.length).toBeGreaterThanOrEqual(0);
            done();
        }, ((err: Error) => {
            done.fail(err);
        }));
    });

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
