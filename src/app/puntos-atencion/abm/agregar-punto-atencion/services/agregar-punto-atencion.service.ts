import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpSNT } from '../../../../shared/services/http-snt';
import { PuntoAtencionFactory } from './punto-atencion-factory';

@Injectable()
export class AgregarPuntoAtencionService {

    constructor(private http: HttpSNT) { }

    agregarPuntoAtencion(puntoAtencion: NuevoPuntoAtencionForm): Observable<BackOfficeStatusResponse> {
        return this.http.post('puntosatencion', puntoAtencion)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    editarPuntoAtencion(puntoAtencion: NuevoPuntoAtencionForm): Observable<BackOfficeStatusResponse> {
        return this.http.put('puntosatencion/' + puntoAtencion.id, puntoAtencion)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    getPuntoAtencionById(idPuntoAtencion: number): Observable<PuntoAtencion> {
        return this.http.get<PuntoAtencion>('puntosatencion/' + idPuntoAtencion)
            .map((response: BackOfficeResponse<PuntoAtencion>) => {
                return PuntoAtencionFactory.create(response);
            });
    }

    getAreaById(idOrganismo: number, idArea: number): Observable<Area> {
        return this.http.get<Area>('organismos/' + idOrganismo + '/areas/' + idArea)
            .map((response: BackOfficeResponse<Area>) => {
                return response.result;
            });
    }

    getAllTramitesByArea(idOrg: number, idArea: number): Observable<Tramite[]> {
        return this.http.get<Tramite[]>('organismos/' + idOrg + '/areas/' + idArea + '/tramites', {
            offset: 0,
            limit: 1000
        }).map((response: BackOfficeResponse<Tramite[]>) => {
            return response.result;
        });
    }

}
