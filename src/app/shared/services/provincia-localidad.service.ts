import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { environment } from '../../../environments/environment';

import { ProvinciasImpl } from './provincias';
import { LocalidadesImpl } from './localidades';

@Injectable()
export class ProvinciaLocalidadService {

  constructor(private http: Http) { }

  getProvincias(): Observable<Provincias> {
    const parameters = new URLSearchParams();
    parameters.set('offset', '0');
    parameters.set('limit', '30');
    return this.http.get(environment.endpoint.SNTAPI + 'provincias', { params: parameters })
      .map((response: Response) => {
        return new ProvinciasImpl(response.json());
      });
  }

  getLocalidades(keywords: string, idProvincia: number): Observable<Localidades> {
    const parameters = new URLSearchParams();
    parameters.set('qry', keywords);
    return this.http.get(environment.endpoint.SNTAPI + 'provincias/' + idProvincia + '/localidades/buscar', { params: parameters })
      .map((response: Response) => {
        return new LocalidadesImpl(response.json());
      })
  }

  getLocalidadesKeyword(keywordsObs: Observable<string>, provinciaObs: Observable<Provincia>) {
    const debounce = 400;
    return provinciaObs.switchMap(provincia => {
      return keywordsObs.debounceTime(debounce).distinctUntilChanged().switchMap(keywords =>
        this.getLocalidades(keywords, provincia.id)
    )
    })
  }

}
