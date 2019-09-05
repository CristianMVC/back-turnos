import { Injectable } from '@angular/core';
import { HttpSNT } from '../../../../shared/services/http-snt';

@Injectable()
export class EliminarRangoService {

    constructor(private http: HttpSNT) { }

    eliminarRango(idPuntoAtencion: number, idRango: number) {
        return this.http.delete('puntosatencion/' + idPuntoAtencion + '/horarioatencion/' + idRango)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

}
