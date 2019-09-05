import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpSNT } from '../../shared/services/http-snt';
import { EtiquetasImpl } from '../models/etiqueta-model';


@Injectable()
export class EtiquetasService {
    private limit = 10;

    constructor(private http: HttpSNT) { }

    getEtiquetas(offset = 0, limit = 10): Observable<EtiquetasPag> {
        return this.http.get<Etiqueta[]>('listar/etiquetas', {
            offset: offset,
            limit: limit
        }).map((response: BackOfficeResponse<Etiqueta[]>) => {
            return new EtiquetasImpl(response);
        });
    }

    crearEtiqueta(etiqueta: any): Observable<BackOfficeStatusResponse> {
        return this.http.post('crear/etiqueta', etiqueta)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    eliminarEtiqueta( idEtiqueta: any) : Observable<BackOfficeStatusResponse> {
        return this.http.delete('eliminar/etiqueta/' +  idEtiqueta)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });


    }

    modificarEtiqueta(etiqueta: any, nombre: any) : Observable<BackOfficeStatusResponse>{
        return this.http.put('modificar/etiqueta/'+etiqueta.id, nombre )
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    asignarEtiquetas(etiquetas:any, idTramite:number): Observable<BackOfficeStatusResponse>{
        return this.http.put('asignar/etiquetas/tramite/'+idTramite, { 'etiquetas': etiquetas } )
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    getEtiquetasAsignadas(idTramite:number,offset = 0) : Observable<EtiquetasPag> {
        return this.http.get<Etiqueta[]>('listar/etiquetas/tramite/'+idTramite, {
            offset: offset,
            limit: this.limit
        }).map((response: BackOfficeResponse<Etiqueta[]>) => {
            return new EtiquetasImpl(response);
        });

    }



    getLimit() {
        return this.limit;
    }


}