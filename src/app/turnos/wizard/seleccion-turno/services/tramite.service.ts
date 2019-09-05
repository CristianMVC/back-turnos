import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../../../environments/environment';
import { TramiteFactory } from './tramite-factory';

@Injectable()
export class TramiteService {

    constructor(private http: Http) { }

    getTramiteById(tramiteId: number): Observable<TurnosTramite> {
        return this.http.get(environment.endpoint.SNTAPI + 'tramites/' + tramiteId ).map((response: Response) => {
            return TramiteFactory.create(response.json()).success();
        });
    }


}
