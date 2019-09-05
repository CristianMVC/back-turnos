import * as jsc from '../../../../../../node_modules/jsverify/lib/jsverify.js';
import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { DiasDisponiblesTurnoService } from './dias-disponibles-turno.service';
import { ProvinciaLocalidadService } from '../services/provincia-localidad.service';
import { PuntoAtencionService } from '../services/punto-atencion.service';

import * as R from 'ramda';
import * as moment from 'moment';

describe('DiasDisponiblesTurnoService', () => {

    let originalTimeout: number;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DiasDisponiblesTurnoService,
                ProvinciaLocalidadService,
                PuntoAtencionService],
            imports: [HttpModule]
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000; // tslint:disable-line:no-magic-numbers
    });

    it('should be created', inject([DiasDisponiblesTurnoService], (service: DiasDisponiblesTurnoService) => {
        expect(service).toBeTruthy();
    }));

    it('should create a list of moments given a current date using the horizonte', () => {
        const service: DiasDisponiblesTurnoService = TestBed.get(DiasDisponiblesTurnoService);
        expect(jsc.checkForall(jsc.datetime, jsc.number, (date: Date, horizonte: number) => {
            const dates = service.createRange(moment(date), horizonte);
            const amountOfTimes = 10;
            const after = R.range(horizonte, horizonte + (horizonte * amountOfTimes)).map((number) => moment(date).add(number, 'days'));
            const before = R.range(- horizonte * amountOfTimes, 0).map((number) => moment(date).add(number, 'days'));
            return R.equals(dates, before.concat(after));
        })).toBeTruthy();
    });

    it('should get dias de turnos disponibles', (done: DoneFn) => {
        const service: DiasDisponiblesTurnoService = TestBed.get(DiasDisponiblesTurnoService);
        const provinciaLocalidadService: ProvinciaLocalidadService = TestBed.get(ProvinciaLocalidadService);
        const tramiteId = 26;
        provinciaLocalidadService.getProvincias(tramiteId).subscribe((provincias: Provincia[]) => {
            provinciaLocalidadService.getLocalidades(provincias[0].id, tramiteId).subscribe((localidades: Localidad[]) => {
                const criterio: SeleccionTurnoCriteria = {
                    tramiteId: 26,
                    provincia: provincias[0],
                    localidad: localidades[0],
                    puntoAtencion: { id: 1 } as TurnosPuntoAtencion,
                    fecha: undefined,
                    hora: 'undefined'
                };
                service.getDiasDeTurnosDisponibles(criterio).subscribe((fechas: Date[]) => {
                    expect(fechas.length).not.toBeNull();
                    done();
                }, ((err: Error) => {
                    done.fail(err);
                }));
            });
        });
    });

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});




