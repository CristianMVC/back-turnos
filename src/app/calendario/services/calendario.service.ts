import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpSNT } from '../../shared/services/http-snt';
import { CalendarioFactory } from './calendario-factory';

import * as moment from 'moment';

@Injectable()
export class CalendarioService {

    constructor(private http: HttpSNT) { }

    getFeriados(): Observable<moment.Moment[]> {
        return this.http.get<moment.Moment[]>('feriadoNacional')
            .map((response: BackOfficeResponse<moment.Moment[]>) => {
                return CalendarioFactory.create(response.result);
            });
    }

    agregarFeriadoNacional(date: string): Observable<BackOfficeStatusResponse> {
        const payload = {fecha: date};
        return this.http.post('feriadoNacional', payload)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    eliminarFeriadoNacional(date: string): Observable<BackOfficeStatusResponse> {
        return this.http.delete('feriadoNacional/' + date)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }
}
