import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../../../environments/environment';

import { PuntoAtencionFactory } from './punto-atencion-factory'

@Injectable()
export class PuntoAtencionService {

    constructor(private http: Http) { }

    getPuntosAtencion(criterio: SeleccionTurnoCriteria): Observable<TurnosPuntoAtencion[]> {
      const parameters = new URLSearchParams();
      parameters.set('tramiteId', criterio.tramiteId.toString());
      parameters.set('provincia', criterio.provincia.id.toString());
      parameters.set('localidad', criterio.localidad.id.toString());

      return this.http.get(environment.endpoint.SNTAPI + 'disponibilidad/puntosatencion',
        { params: parameters }
      ).map((response: Response) => {
         return PuntoAtencionFactory.create(response.json()).success();
        });
      }

}
