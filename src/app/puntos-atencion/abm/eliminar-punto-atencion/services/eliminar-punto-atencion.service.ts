import { Injectable } from '@angular/core';
import { HttpSNT } from '../../../../shared/services/http-snt';

@Injectable()
export class EliminarPuntoAtencionService {

    constructor(private http: HttpSNT) { }

    eliminarPuntoAtencion(id: number) {
        return this.http.delete('puntosatencion/' + id)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

}
