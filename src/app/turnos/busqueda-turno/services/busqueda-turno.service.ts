import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ResultadoBusquedaTurnoFactory } from './resultado-busqueda-turno-factory'
import { environment } from '../../../../environments/environment';

@Injectable()
export class  BusquedaTurnoService {

    constructor(private http: Http) { }

    buscarTurno(cuil: string, codigo: string): Observable<ResultadoBusquedaTurno> {
        const parameters = new URLSearchParams();
        parameters.set('cuil', cuil.toString());
        parameters.set('codigo', codigo.toString());
        return this.http.get(environment.endpoint.SNTAPI + 'turnos/buscar', { params: parameters })
            .map((response: Response) => {
                return ResultadoBusquedaTurnoFactory.create(response.json()).success();
            });
    }
}
