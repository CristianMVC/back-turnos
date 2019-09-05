import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../environments/environment';
import { FormularioFactory } from './formulario-factory';



@Injectable()
export class FormularioTramiteService {

    constructor(private http: Http) { }

    getFormularioByTramiteId(tramiteId: number): Observable<Formulario> {
        return this.http.get(environment.endpoint.SNTAPI + 'tramites/' + tramiteId + '/formulario')
            .map((response: Response) => {
                return FormularioFactory.create(response.json());
            });
    }
}
