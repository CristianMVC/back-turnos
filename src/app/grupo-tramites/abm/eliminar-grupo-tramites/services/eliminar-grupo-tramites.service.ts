import { Injectable } from '@angular/core';
import { HttpSNT } from '../../../../shared/services/http-snt';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliminarGrupoTramitesService {

    constructor(private http: HttpSNT) { }

    eliminarGrupoTramites(idPuntoAtencion: number, idGrupo: number): Observable<BackOfficeStatusResponse> {
        return this.http.delete('puntosatencion/' + idPuntoAtencion + '/grupostramites/' + idGrupo)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

}
