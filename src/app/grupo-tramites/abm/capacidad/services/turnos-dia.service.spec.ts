import { TestBed, inject } from '@angular/core/testing';
import { TurnosDiaService } from './turnos-dia.service';

describe('TurnosDiaService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TurnosDiaService]
        });
    });

    it('should be created', inject([TurnosDiaService], (service: TurnosDiaService) => {
        expect(service).toBeTruthy();
    }));

    it('should get total turnos por intervalo', function() {
        const service: TurnosDiaService = TestBed.get(TurnosDiaService);
        const intervalo = 60;
        const capacidad = {
            idRow: 1,
            diasSemana: [0],
            cantidadTurnos: 10,
            grupoTramite: 1,
            horaInicio: '12:00',
            horaFin: '13:00'
        };

        const total = service.getTotalTurnos(capacidad, intervalo);
        const expectedResult = 10;
        expect(total).toEqual(expectedResult);
    });

    it('should get total turnos por dia', function() {
        const service: TurnosDiaService = TestBed.get(TurnosDiaService);
        const intervalo = 60;
        // tslint:disable
        const capacidades = [{
            idRow: 1,
            diasSemana: [1],
            cantidadTurnos: 10,
            grupoTramite: 1,
            horaInicio: '12:00',
            horaFin: '13:00'
        }, {
            idRow: 1,
            diasSemana: [2],
            cantidadTurnos: 20,
            grupoTramite: 1,
            horaInicio: '12:00',
            horaFin: '13:00'
        }];
        
        const totales = service.getTotalesDia(capacidades, intervalo);
        const expectedResult = [10, 20, 0, 0, 0, 0, 0];
        // tslint:enable
        expect(totales).toEqual(expectedResult);
    });
});
