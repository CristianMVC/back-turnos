import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpSNT } from '../../../shared/services/http-snt';
import { RangosPaginablesImpl } from './models/rangos-paginables';

@Injectable()
export class RangosService {
    private limit = 30;

    constructor(private http: HttpSNT) { }

    getAllRangos(idPuntoAtencion: number, offset = 0): Observable<RangosPaginables> {
        return this.http.get<Rango[]>('puntosatencion/' + idPuntoAtencion + '/horarioatencion', {
            offset: offset,
            limit: this.limit
        }).map((response: BackOfficeResponse<Rango[]>) => {
            return new RangosPaginablesImpl(response);
        });
    }

    getLimit() {
        return this.limit;
    }
}
