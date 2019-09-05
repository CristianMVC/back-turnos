import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpSNT } from '../../../../shared/services/http-snt';

@Injectable()
export class AgregarGrupoTramitesService {

    constructor(private http: HttpSNT) { }

    agregarGrupoTramites(idPuntoAtencion: number, grupoTramites: NuevoGrupoTramitesForm): Observable<BackOfficeStatusResponse> {
        return this.http.post('puntosatencion/' + idPuntoAtencion + '/grupostramites', grupoTramites)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    editarGrupoTramites(idPuntoAtencion: number, grupoTramites: NuevoGrupoTramitesForm): Observable<BackOfficeStatusResponse> {
        return this.http.put('puntosatencion/' + idPuntoAtencion +
            '/grupostramites/' + grupoTramites.id, grupoTramites)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    getGrupoTramitesById(idPuntoAtencion: number, idGrupoTramites: number): Observable<GrupoTramites> {
        return this.http.get<GrupoTramites>('puntosatencion/' + idPuntoAtencion + '/grupostramites/' + idGrupoTramites)
            .map((response: BackOfficeResponse<GrupoTramites>) => {
                return response.result;
            });
    }

    getTramitesDisponibles(idPuntoAtencion: number): Observable<Tramite[]> {
        return this.http.get<Tramite[]>('puntosatencion/' + idPuntoAtencion + '/tramitesdisponibles')
            .map((response: BackOfficeResponse<Tramite[]>) => {
                return response.result;
            });
    }

}
