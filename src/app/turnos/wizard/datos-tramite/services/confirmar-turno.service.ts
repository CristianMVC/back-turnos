import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorFactory } from '../../../shared/errors/error-factory';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ConfirmarTurnoService {

    constructor(
        private http: Http
    ) { }

    confirmarTurno(turno: Turno): Observable<{}> {
        return this.http.put(environment.endpoint.SNTAPI + 'turnos/' + turno.id + '/confirmar', turno)
            .map((response: Response) => {
                return new Object();
            })
            .catch((error: any) => {
                return Observable.throw(ErrorFactory.create(error.json()).success());
            });
    }
}
