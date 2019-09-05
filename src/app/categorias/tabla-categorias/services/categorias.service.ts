import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpSNT } from '../../../shared/services/http-snt';
import { CategoriasPaginablesImpl } from './models/categorias-paginables';

@Injectable()
export class CategoriasService {
    private limit = 10;

    constructor(private http: HttpSNT) { }

    getCategorias(idPuntoAtencion: number, offset = 0): Observable<CategoriasPaginables> {
        return this.http.get<Categoria[]>('puntosatencion/' + idPuntoAtencion + '/categorias', {
                offset: offset,
                limit: this.limit
        }).map((response: BackOfficeResponse<Categoria[]>) => {
            return new CategoriasPaginablesImpl(response);
        });
    }

    getLimit() {
        return this.limit;
    }
}
