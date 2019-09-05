import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpSNT } from '../../../shared/services/http-snt';
import { PuntosAtencionPaginablesImpl } from './models/puntos-atencion-paginables'

@Injectable()
export class PuntosAtencionService {
    private limit = 10;

    constructor(private http: HttpSNT) { }

    getPuntosAtencion(idOrg: number, idArea: number, offset = 0): Observable<PuntosAtencionPaginables> {
        return this.http.get<PuntoAtencion[]>('organismos/' + idOrg + '/areas/' + idArea + '/puntoatencion', {
            offset: offset,
            limit: this.limit
        }).map((response: BackOfficeResponse<PuntoAtencion[]>) => {
            return new PuntosAtencionPaginablesImpl(response);
        });
    }

    getAllPuntosAtencion(idOrg: number, idArea: number): Observable<PuntoAtencion[]> {
        return this.http.get<PuntoAtencion[]>('organismos/' + idOrg + '/areas/' + idArea + '/puntoatencion', {
            offset: 0,
            limit: 100
        }).map((response: BackOfficeResponse<PuntoAtencion[]>) => {
            return response.result;
        });
    }

    getLimit() {
        return this.limit;
    }
}
