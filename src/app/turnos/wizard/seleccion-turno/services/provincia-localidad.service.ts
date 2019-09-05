import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../../../environments/environment';

import { Provincias } from './provincias';
import { Localidades } from './localidades';
import { SessionService } from '../../../../shared/services/session.service';
import { RolService } from 'app/shared/services/rol.service';

@Injectable()
export class ProvinciaLocalidadService {

  constructor(
    private http: Http,
    private sessionService:SessionService,
    private rolService:RolService) { }

  getProvincias(tramiteId: number): Observable<Provincia[]> {
    const parameters = new URLSearchParams();
    parameters.set('offset', '0');
    parameters.set('limit', '30');
    var endpoint = environment.endpoint.SNTAPI + 'tramites/' + tramiteId + '/provincias';
    var pdaId = this.sessionService.getPuntoAtencionId();
    if(pdaId && this.rolService.isResponsablePdaLogged() ){
      endpoint = environment.endpoint.SNTAPI + 'tramites/' + tramiteId + '/pda/' + pdaId + '/provincias/';
    } 
    return this.http.get(endpoint, { params: parameters })
      .map((response: Response) => {
        return Provincias.asList(response.json()).success(); // TODO: QUE HACEMOS SI FALLA;
      })
  }

  getLocalidades(idProvincia: number, tramiteId: number): Observable<Localidad[]> {
    const parameters = new URLSearchParams();
    parameters.set('offset', '0');
    parameters.set('limit', '200');
    return this.http.get(environment.endpoint.SNTAPI + 'tramites/' + tramiteId + '/provincias/' + idProvincia,
      { params: parameters })
      .map((response: Response) => {
        return Localidades.asList(response.json()).success(); // TODO: QUE HACEMOS SI FALLA;
      });
  }

}
