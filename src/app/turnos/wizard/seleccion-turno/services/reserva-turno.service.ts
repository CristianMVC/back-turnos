import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpSNT } from '../../../../shared/services/http-snt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Maybe } from 'monet';
import { ReservaTurnoResponseFactory } from './reserva-turno-response-factory';

import { environment } from '../../../../../environments/environment';
import { ErrorFactory } from '../../../shared/errors/error-factory';
enum OrigenType {
    BackOffice=1
}
@Injectable()
export class ReservaTurnoService {

    constructor(private http: HttpSNT) { }

    reservarTurno(reserva: ReservaTurno): Observable<ReservaTurnoResponse> {
        return this.http.post( 'turnos', reserva).map((response: BackOfficeStatusResponse) => {
            return ReservaTurnoResponseFactory.create(response).success();
        }).catch(err => {
            return Observable.throw(ErrorFactory.create(err.json()).success());
        })
    }

    reservarTurnoFromCriteria(criteria: SeleccionTurnoCriteria): Maybe<Observable<ReservaTurnoResponse>> {
        return this.create(criteria).map((r: ReservaTurno) => {
            return this.reservarTurno(r);
        });
    }

    private create(criteria: SeleccionTurnoCriteria): Maybe<ReservaTurno> {
        if (criteria.puntoAtencion && criteria.fecha) {
            return Maybe.Some({
                puntoatencion: criteria.puntoAtencion.id,
                tramite: criteria.tramiteId,
                fecha: criteria.fecha.format('YYYY-MM-DD'),
                hora: criteria.hora,
                alerta: 1,
                origen: OrigenType.BackOffice
            })
        } else {
            return Maybe.None<ReservaTurno>();
        }
    }
}
