import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpSNT } from '../../../shared/services/http-snt';
import { CalendarioFactory } from '../../../calendario/services/calendario-factory';

import * as moment from 'moment';

@Injectable()
export class DiasDeshabilitadosTramiteService {

    constructor(private http: HttpSNT) { } 

    getDiasDeshabilitados(idPuntoAtencion: number,tramite_id: number): Observable<moment.Moment[]> {
        return this.http.get<moment.Moment[]>('puntoAtencion/' + idPuntoAtencion + '/diasnolaborales/'+tramite_id)
            .map((response: BackOfficeResponse<moment.Moment[]>) => {
                return CalendarioFactory.create(response.result);
            });
    }

    deshabilitarDia(idPuntoAtencion: number, date: string, tramite_id: number ): Observable<BackOfficeStatusResponse> {
        const payload = { fecha: date };
        return this.http.post('puntosatencion/' + idPuntoAtencion + '/diaNoHabil/'+tramite_id, payload)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    } 

    deshabilitarDiaSinImportarTurnos(idPuntoAtencion: number, date: string, idTramite:number): Observable<BackOfficeStatusResponse> {
        const payload = { fecha: date };
        return this.http.post(`puntosatencion/${idPuntoAtencion}/inhabilitarfecha/tramite/${idTramite}`, payload)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    eliminarDiaDeshabilitadoTramite(idPuntoAtencion: number, date: string,tramiteId: number): Observable<BackOfficeStatusResponse> {
        const payload = { fecha: date };
        return this.http.post('puntosatencion/' + idPuntoAtencion + '/habilitarFecha/tramite/'+tramiteId, payload)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }
}
