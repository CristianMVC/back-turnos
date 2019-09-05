import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpSNT } from '../../../shared/services/http-snt';
import { AreasPaginablesImpl } from './models/areas-paginables'

@Injectable()
export class AreasService {
    private limit = 10;

    constructor(private http: HttpSNT) { }

    getAreas(idOrganismo: number, offset = 0): Observable<AreasPaginables> {
        return this._getAreas(idOrganismo, offset, this.limit);
    }

    getAllAreas(idOrganismo: number): Observable<Area[]> {
        const offset = 0;
        const limit = 100;
        return this._getAreas(idOrganismo, offset, limit).map((areasP: AreasPaginables) => {
            return areasP.areas;
        });
    }

    _getAreas(idOrganismo: number, offset: number, limit: number): Observable<AreasPaginables> {
        return this.http.get<AreasPaginables>('organismos/' + idOrganismo + '/areas', {
            offset: offset,
            limit: limit
        }).map((response: BackOfficeResponse<AreasPaginables>) => {
            return new AreasPaginablesImpl(response);
        });
    }

    getLimit() {
        return this.limit;
    }
}
