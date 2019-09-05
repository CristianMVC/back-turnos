import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpSNT } from '../../../shared/services/http-snt';
import { TramitesPaginablesImpl } from './models/tramites-paginables'

@Injectable()
export class TramitesService {

    private limit = 10;

    constructor(private http: HttpSNT) { }

    getTramites(idPuntoAtencion: number, offset = 0): Observable<TramitesPdaPaginables> {
        return this.http.get<TramitePda[]>('puntosatencion/' + idPuntoAtencion + '/tramites', {
            offset: offset,
            limit: this.limit
        }).map((response: BackOfficeResponse<TramitePda[]>) => {
            return new TramitesPaginablesImpl(response);
        });
    }

    getLimit() {
        return this.limit;
    }

    setEstadoTramite(idPuntoAtencion: number, idTramite: number, estado: number): Observable<BackOfficeStatusResponse> {
        return this.http.put('puntosatencion/' + idPuntoAtencion + '/tramites/' + idTramite + '/visibilidad', {
            estado: estado
        }).map((response: BackOfficeStatusResponse) => {
            return response;
        });
    }
}
