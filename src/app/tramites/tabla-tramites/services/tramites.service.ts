import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpSNT } from '../../../shared/services/http-snt';
import { TramitesPaginablesImpl } from './models/tramites-paginables'

@Injectable()
export class TramitesService {
    private limit = 10;

    constructor(private http: HttpSNT) { }

    getTramites(idOrg: number, idArea: number, offset = 0): Observable<TramitesPaginables> {
        return this.http.get<Tramite[]>('organismos/' + idOrg + '/areas/' + idArea + '/tramites', {
            offset: offset,
            limit: this.limit
        }).map((response: BackOfficeResponse<Tramite[]>) => {
            return new TramitesPaginablesImpl(response);
        });
    }


    getTramitesorg(idOrg: number, offset = 0): Observable<TramitesPaginables> {
        return this.http.get<Tramite[]>('organismos/' + idOrg + '/areas/' + null + '/tramites', {
            offset: offset,
            limit: this.limit
        }).map((response: BackOfficeResponse<Tramite[]>) => {
            return new TramitesPaginablesImpl(response);
        });
    }


    getLimit() {
        return this.limit;
    }
}
