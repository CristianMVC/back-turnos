import { Injectable } from '@angular/core';
import { PuntosAtencionService } from '../../../../puntos-atencion/tabla-puntos-atencion/services/puntos-atencion.service';

@Injectable()
export class TestHelperRango {

    constructor (
        private puntosAtencionService: PuntosAtencionService
    ) {}

    createNuevoRango () {
        return {
            horaInicio: '22:00',
            horaFin: '23:00',
            diasSemana: [2], // tslint:disable-line:no-magic-numbers
            idRow: 0
        }
    }

    createRangoEditar(rangoId: number) {
        return {
            horaInicio: '21:00',
            horaFin: '23:00',
            diasSemana: [2], // tslint:disable-line:no-magic-numbers
            idRow: rangoId
        };
    }

    getPuntosAtencion() {
        const orgId = 1;
        const areaId = 2;

        return this.puntosAtencionService.getPuntosAtencion(orgId, areaId);

    }
}
