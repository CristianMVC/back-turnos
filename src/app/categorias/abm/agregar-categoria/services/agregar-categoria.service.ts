import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpSNT } from '../../../../shared/services/http-snt';

@Injectable()
export class AgregarCategoriaService {

    constructor(private http: HttpSNT) { }

    agregarCategoria(idPuntoAtencion: number, categoria: NuevaCategoriaForm): Observable<BackOfficeStatusResponse> {
        return this.http.post('puntosatencion/' + idPuntoAtencion + '/categorias', categoria)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    editarCategoria(idPuntoAtencion: number, categoria: NuevaCategoriaForm): Observable<BackOfficeStatusResponse> {
        return this.http.put('puntosatencion/' + idPuntoAtencion +
            '/categorias/' + categoria.id, categoria)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    getCategoriaById(idPuntoAtencion: number, idCategoria: number): Observable<Categoria> {
        return this.http.get<Categoria>('puntosatencion/' + idPuntoAtencion + '/categorias/' + idCategoria)
            .map((response: BackOfficeResponse<Categoria>) => {
                return response.result;
            });
    }

    getTramitesDisponibles(idPuntoAtencion: number): Observable<Tramite[]> {
        return this.http.get<Tramite[]>('puntosatencion/' + idPuntoAtencion + '/categorias/tramitesdisponibles')
            .map((response: BackOfficeResponse<Tramite[]>) => {
                return response.result;
            });
    }

}
