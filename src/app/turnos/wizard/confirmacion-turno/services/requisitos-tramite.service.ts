import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../../../environments/environment';

import { Requisitos } from './requisitos';

@Injectable()
export class RequisitosTramiteService {

    constructor(private http: Http) { }

    getRequisitosByTramiteId(tramiteId: number): Observable<Requisito[]> {
        return this.http.get(environment.endpoint.SNTAPI + 'tramites/' + tramiteId + '/requisitos')
            .map((response: Response) => {
                return Requisitos.asList(response.json());
            });
    }
}
