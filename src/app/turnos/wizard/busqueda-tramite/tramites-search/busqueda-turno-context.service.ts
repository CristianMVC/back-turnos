import { Injectable } from '@angular/core';

@Injectable()
export class BusquedaTurnoContextService {

    private _datosTurno: ResultadoBusquedaTurno

    datosTurno(datosTurno: ResultadoBusquedaTurno) {
        this._datosTurno = datosTurno;
    }

    getDatosTurno() {
        return this._datosTurno;
    }
}
