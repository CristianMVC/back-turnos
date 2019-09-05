import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { environment } from '../../../../../environments/environment';
import { TramitePaginablesFactory } from './tramite-paginables-factory';


@Injectable()
export class TramitesService {

    private limit = 12;

    constructor(private http: Http) { }

    getTramites(keywords: string[], offset = 0): Observable<TurnosTramitesPaginables> {
        const parameters = new URLSearchParams();
        parameters.set('offset', offset.toString());
        parameters.set('limit', this.limit.toString());
        keywords.forEach((k: string) => parameters.append('q', k));
        return this.http.get(environment.endpoint.SNTAPI + 'tramites', { params: parameters }).map((response: Response) => {
            return TramitePaginablesFactory.create(response.json()).success();
        });
    }

    getLimit() {
        return this.limit;
    }

    getTramitesByKeywords(keywordsObs: Observable<string[]>) {
        const debounceTime = 400;
        return keywordsObs.debounceTime(debounceTime)
            .distinctUntilChanged()
            .switchMap(keywords => this.getTramites(keywords));
    }

}
