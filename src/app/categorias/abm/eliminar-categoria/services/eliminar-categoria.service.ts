import { Injectable } from '@angular/core';
import { HttpSNT } from '../../../../shared/services/http-snt';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliminarCategoriaService {

    constructor(private http: HttpSNT) { }

    eliminarCategoria(idPuntoAtencion: number, idCategoria: number): Observable<BackOfficeStatusResponse> {
        return this.http.delete('puntosatencion/' + idPuntoAtencion + '/categorias/' + idCategoria)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

}
