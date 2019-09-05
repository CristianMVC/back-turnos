import { Injectable } from '@angular/core';
import { HttpSNT } from '../../../../shared/services/http-snt';

@Injectable()
export class EliminarAreaService {

    constructor(private http: HttpSNT) { }

    eliminarArea(idOrganismo: number, idArea: number) {
        return this.http.delete('organismos/' + idOrganismo + '/areas/' + idArea)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

}
