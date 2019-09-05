import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpSNT } from '../../../../shared/services/http-snt';
import { OrganismoFactory } from './organismo-factory';

@Injectable()
export class AgregarOrganismoService {

    constructor(private http: HttpSNT) { }

    agregarOrganismo(nuevoOrganismo: NuevoOrganismoForm): Observable<BackOfficeStatusResponse> {
        return this.http.post('organismos', nuevoOrganismo)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    editarOrganismo(organismo: Organismo): Observable<BackOfficeStatusResponse> {
        return this.http.put('organismos/' + organismo.id, organismo)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    getOrganismoById(id: number): Observable<Organismo> {
        return this.http.get<Organismo>('organismos/' + id)
            .map((response: BackOfficeResponse<Organismo>) => {
                return OrganismoFactory.create(response);
            });
    }

}
