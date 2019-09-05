import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpSNT } from '../../../../shared/services/http-snt';

@Injectable()
export class CapacidadService {

    constructor( private http: HttpSNT ) { }

    getCapacidad(idPuntoAtencion: number, idGrupoTramite: number): Observable<Disponibilidad[]> {
        return this.http.get<Disponibilidad[]>('disponibilidad/puntosatencion/'
                + idPuntoAtencion + '/grupotramite/' + idGrupoTramite)
            .map((response: BackOfficeResponse<Disponibilidad[]>) => {
                return response.result;
            });

    }

    getRangos(idPuntoAtencion: number): Observable<Disponibilidad[]> {
        return this.http.get<Disponibilidad[]>('puntosatencion/' + idPuntoAtencion + '/horarioatencion',
        {offset: 0, limit: 100}).map((response: BackOfficeResponse<Disponibilidad[]>) => {
            return response.result.map((disp: Disponibilidad) => {
                disp.cantidadTurnos = 0;
                return disp;
            });
        });
    }

    setCapacidad(idPuntoAtencion: number, idGrupoTramite: number, cantTurnos: number,
        idRow: number = 0): Observable<BackOfficeStatusResponse> {
        const reqData = {
            'puntoAtencion': idPuntoAtencion,
            'grupoTramite': idGrupoTramite,
            'cantidadTurnos': cantTurnos
        };
        return this.http.put('disponibilidad/' + idRow, reqData)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });

    }
}
