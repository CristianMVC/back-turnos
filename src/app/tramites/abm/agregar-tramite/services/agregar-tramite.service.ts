import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpSNT } from '../../../../shared/services/http-snt';
import { TramiteFormFactory } from './tramite-form-factory';

@Injectable()
export class AgregarTramiteService {

    constructor(private http: HttpSNT) { }

    agregarTramite(nuevoTramite: NuevoTramiteForm): Observable<BackOfficeStatusResponse> {
        return this.http.post('tramites', nuevoTramite)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    editarTramite(tramite: NuevoTramiteForm): Observable<BackOfficeStatusResponse> {

        return this.http.put('tramites/' + tramite.id, tramite)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    getTramiteById(idTramite: number): Observable<NuevoTramiteForm> {
        return this.http.get<NuevoTramiteForm>('tramites/' + idTramite)
            .map((response: BackOfficeResponse<NuevoTramiteForm>) => {
                return TramiteFormFactory.createFromResponse(response.result);
            });
    }

    getCamposDisponibles(): Observable<TramiteField[]> {
        return this.http.get<TramiteField[]>('tramites/formulario/campos')
            .map((response: BackOfficeResponse<TramiteField[]>) => {
                return response.result;
            });
    }

    getAreasTramite(idTramite: number): Observable<any[]> {
        return this.http.get<any[]>('areas/tramites/' + idTramite)
            .map((response: BackOfficeResponse<any[]>) => {
                return response.result;
            });


    }
}

