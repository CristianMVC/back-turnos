import { Injectable } from '@angular/core';
import { HttpSNT } from '../../../../shared/services/http-snt';

@Injectable()
export class EliminarOrganismoService {

    constructor(private http: HttpSNT) { }

    eliminarOrganismo(id: number) {
        return this.http.delete('organismos/' + id)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

}
