import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../../environments/environment';
import 'rxjs/add/observable/throw';
import { ErrorFactory } from '../../../errors/error-factory';

@Injectable()
export class CancelarTurnoService {

    constructor(private http: Http) { }

    cancelarTurno(codigo: string) {
        return this.http.put(environment.endpoint.SNTAPI + 'turnos/' + codigo + '/cancelar', {})
            .map((response: Response) => {
                return response.json();
            })
            .catch(err => {
                return Observable.throw(ErrorFactory.create(err.json()).success());
            })
    }
}
