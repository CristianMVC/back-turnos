import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpSNT } from '../../../../shared/services/http-snt';
import { AreaFactory } from './area-factory';

@Injectable()
export class AgregarAreaService {

    constructor(private http: HttpSNT) { }

    agregarArea(idOrganismo: number, nuevoArea: NuevoAreaForm): Observable<BackOfficeStatusResponse> {
        return this.http.post('organismos/' + idOrganismo + '/areas', nuevoArea)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    editarArea(idOrganismo: number, area: Area): Observable<BackOfficeStatusResponse> {
        return this.http.put('organismos/' + idOrganismo + '/areas/' + area.id, area)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    getAreaById(idOrganismo: number, idArea: number): Observable<Area> {
        return this.http.get<Area>('organismos/' + idOrganismo + '/areas/' + idArea)
            .map((response: BackOfficeResponse<Area>) => {
                return AreaFactory.create(response);
            });
    }

}
