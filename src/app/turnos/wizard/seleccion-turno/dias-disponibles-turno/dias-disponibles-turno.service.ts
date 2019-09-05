import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../../../environments/environment';
import { DateFactory } from './date.factory';

import * as R from 'ramda';
import * as moment from 'moment';

@Injectable()
export class DiasDisponiblesTurnoService {

    constructor(private http: Http) { }

    createRange(date: moment.Moment, horizonte: number): moment.Moment[] {
        const amountOfTimes = 10;
        const afterHorizonte = R.range(horizonte, horizonte + (horizonte * amountOfTimes))
            .map((number) => moment(date).add(number, 'days'));
        const beforeCurrentDate = R.range(-horizonte * amountOfTimes, 0)
            .map((number) => moment(date).add(number, 'days'));
        return beforeCurrentDate.concat(afterHorizonte);
    }

    getDiasDeTurnosDisponibles(criteria: SeleccionTurnoCriteria): Observable<Date[]> {
        const parameters = new URLSearchParams();
        parameters.set('tramiteId', criteria.tramiteId.toString());
        parameters.set('provincia', criteria.provincia.id.toString());
        parameters.set('localidad', criteria.localidad.id.toString());
        parameters.set('puntoAtencionId', criteria.puntoAtencion ? criteria.puntoAtencion.id.toString() : '-1');
        return this.http.get(environment.endpoint.SNTAPI + 'disponibilidad/fechas', { params: parameters })
            .map((response: Response) => {
                return DateFactory.create(response.json());
            });
    }
}
