import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpSNT } from '../../shared/services/http-snt';
import { CalendarioFactory } from '../../calendario/services/calendario-factory';

import * as moment from 'moment';

@Injectable()
export class DiasDeshabilitadosService {

    constructor(private http: HttpSNT) { }

    getDiasDeshabilitados(idPuntoAtencion: number): Observable<moment.Moment[]> {
        return this.http.get<moment.Moment[]>('puntoAtencion/' + idPuntoAtencion + '/diasnolaborales')
            .map((response: BackOfficeResponse<moment.Moment[]>) => {
                return CalendarioFactory.create(response.result);
            });
    }

    deshabilitarDia(idPuntoAtencion: number, date: string): Observable<BackOfficeStatusResponse> {
        const payload = { fecha: date };
        return this.http.post('puntosatencion/' + idPuntoAtencion + '/diaNoHabil', payload)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    deshabilitarDiaSinImportarTurnos(idPuntoAtencion: number, date: string): Observable<BackOfficeStatusResponse> {
        const payload = { fecha: date };
        return this.http.post(`puntosatencion/${idPuntoAtencion}/inhabilitarfecha`, payload)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    eliminarDiaDeshabilitado(idPuntoAtencion: number, date: string): Observable<BackOfficeStatusResponse> {
        const payload = { fecha: date };
        return this.http.post('puntosatencion/' + idPuntoAtencion + '/habilitarFecha', payload)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }
}
