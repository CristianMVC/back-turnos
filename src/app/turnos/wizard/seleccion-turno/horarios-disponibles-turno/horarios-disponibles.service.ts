import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../../../environments/environment';
import { HorarioFactory } from './horario-factory'

@Injectable()
export class HorariosDisponiblesService {

    constructor(private http: Http) { }

    getHorarios(tramiteId: number, date: moment.Moment, puntoAtencion: TurnosPuntoAtencion): Observable<Horario[]> {
        const parameters = new URLSearchParams();
        parameters.set('tramiteId', tramiteId.toString());
        parameters.set('fecha', date.format('YYYY-MM-DD'));
        return this.http.get(environment.endpoint.SNTAPI + 'disponibilidad/horarios/' + puntoAtencion.id,
            { params: parameters })
            .map((response: Response) => {
                return HorarioFactory.create(response.json()).success();
            });
    }
}
