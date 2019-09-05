import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpSNT } from '../../shared/services/http-snt';
import { CategoriasPaginablesImpl } from './models/categorias-paginables';

@Injectable()
export class CategoriasService {
    private limit = 10;

    constructor(private http: HttpSNT) { }

    getCategorias(offset = 0): Observable<CategoriasPaginables> {
        return this.http.get<Categoria[]>('categoria/tramites', {
            offset: offset,
            limit: this.limit
        }).map((response: BackOfficeResponse<Categoria[]>) => {
            return new CategoriasPaginablesImpl(response);
        });
    }


    crearCategoria(categoria: any): Observable<BackOfficeStatusResponse> {
        return this.http.post('crear/categoria/tramites', categoria)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    eliminarCategoria( idCategoria: any) : Observable<BackOfficeStatusResponse> {
        return this.http.delete('eliminar/categoria/tramites/' + idCategoria)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });


    }

    modificarCategoria(categoria: any, nombre: any) : Observable<BackOfficeStatusResponse>{
        return this.http.post('modificar/categoria/'+categoria.id +'/tramites', nombre )
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }


    addTramite(idCat: number, idTram: number ):  Observable<BackOfficeStatusResponse>{
        return this.http.put('asignar/categoria/' + idCat + '/tramite/' +  idTram ,  null )
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }



    getLimit() {
        return this.limit;
    }
}
