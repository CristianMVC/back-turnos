import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class HorizonteTramiteService {

    constructor(private http: Http) { }

    getHorizonteTramite(idTramite: number): Observable<Number> {
        return this.http.get(environment.endpoint.SNTAPI + 'tramites/' + idTramite + '/horizonte')
        .map((response: Response) => {
          return response.json().result.horizonte;
        });
      }
}
