import { Injectable } from '@angular/core';
import { HttpSNT } from '../../../../shared/services/http-snt';


@Injectable()
export class EliminarTramiteService {

    constructor(private http: HttpSNT) { }

    eliminarTramite(idTramite: number, idArea: any) {

        if(idArea) {
            return this.http.delete('tramites/' + idTramite +'/area/' + idArea)
                .map((response: BackOfficeStatusResponse) => {
                    return response;
                });

        } else {

            return this.http.delete('tramites/' + idTramite)
                .map((response: BackOfficeStatusResponse) => {
                    return response;
                });

        }

    }

}
