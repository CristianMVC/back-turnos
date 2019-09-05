import { Injectable } from '@angular/core';

@Injectable()
export class BusquedaTurnoContextService {

    private _datosTurno: ResultadoBusquedaTurno

    datosTurno(datosTurno: ResultadoBusquedaTurno) {
        this._datosTurno = datosTurno;
    }

    getDatosTurnoAsVisualizacionConfirmacionTurno(): VisualizacionConfirmacionTurno  {
        return {
            id: this._datosTurno.id,
            codigo: this._datosTurno.codigo,
            nombreArea: this._datosTurno.nombreArea,
            tramite: this._datosTurno.tramite.nombre,
            fecha: this._datosTurno.fecha,
            hora: this._datosTurno.hora,
            puntoAtencion: this._datosTurno.puntoAtencion
        }
    }
}
