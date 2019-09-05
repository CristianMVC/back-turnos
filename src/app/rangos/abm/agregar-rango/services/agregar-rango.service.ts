import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpSNT } from '../../../../shared/services/http-snt';

@Injectable()
export class AgregarRangoService {

    constructor(private http: HttpSNT) { }

    agregarRango(idPuntoAtencion: number, rango: NuevoRangoForm): Observable<BackOfficeStatusResponse> {
        return this.http.post('puntosatencion/' + idPuntoAtencion + '/horarioatencion', rango)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    editarRango(idPuntoAtencion: number, rango: NuevoRangoForm): Observable<BackOfficeStatusResponse> {
        return this.http.put('puntosatencion/' + idPuntoAtencion +
            '/horarioatencion/' + rango.idRow, rango)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    getRangoById(idPuntoAtencion: number, idRango: number): Observable<Rango> {
        return this.http.get<Rango>('puntosatencion/' + idPuntoAtencion + '/horarioatencion/' + idRango)
            .map((response: BackOfficeResponse<Rango>) => {
                return response.result;
            });
    }

    getRangoHorario(): Observable<RangoHorario> {
        return this.http.get<RangoHorario>('horariosatencion/listarhorarios')
            .map((response: BackOfficeResponse<RangoHorario>) => {
                return response.result;
            })
    }
}
