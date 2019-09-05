import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpSNT } from '../../../shared/services/http-snt';
import { GrupoTramitesPaginablesImpl } from './models/grupo-tramites-paginables';

@Injectable()
export class GrupoTramitesService {
    private limit = 10;

    constructor(private http: HttpSNT) { }

    getGrupoTramites(idPuntoAtencion: number, offset = 0): Observable<GrupoTramitesPaginables> {
        return this.http.get<GrupoTramites[]>('puntosatencion/' + idPuntoAtencion + '/grupostramites', {
                offset: offset,
                limit: this.limit
        }).map((response: BackOfficeResponse<GrupoTramites[]>) => {
            return new GrupoTramitesPaginablesImpl(response);
        });
    }

    getLimit() {
        return this.limit;
    }
}
