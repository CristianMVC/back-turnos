import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import * as moment from 'moment';

import { PuntoAtencionService } from './punto-atencion.service';

describe('PuntoAtencionService', () => {

    let originalTimeout: number;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PuntoAtencionService],
            imports: [HttpModule]
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 80000; // tslint:disable-line:no-magic-numbers
    });

    it('should be created', inject([PuntoAtencionService], (service: PuntoAtencionService) => {
        expect(service).toBeTruthy();
    }));

    it('should get puntosAtencion per criteria', (done: DoneFn) => {
        const service: PuntoAtencionService = TestBed.get(PuntoAtencionService);
        const criterio: SeleccionTurnoCriteria = {
            tramiteId: 26,
            provincia: {id: 21, nombre: 'Santa Fe'},
            localidad: {id: 2030, nombre: 'Lazzarino'},
            fecha: moment(),
            hora: '8:00',
            puntoAtencion: undefined
        };
        service.getPuntosAtencion(criterio).subscribe((results: TurnosPuntoAtencion[]) => {
            expect(results.length).not.toBeNull();
            done();
        }, ((err: Error) => {
            done.fail(err);
        }));
    });
});
