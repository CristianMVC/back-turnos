import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpSNT } from '../../../../shared/services/http-snt';

@Injectable()
export class EditarTramitePdaService {

    constructor(private http: HttpSNT) { }

    editarTramitePda(idPuntoAtencion: number, tramitePda: TramitePdaForm): Observable<BackOfficeStatusResponse> {
        return this.http.put('puntosatencion/' + idPuntoAtencion +
            '/tramites/' + tramitePda.id, tramitePda)
            .map((response: BackOfficeStatusResponse) => {
                return response;
            });
    }

    getTramitePdaById(idPuntoAtencion: number, idTramitePda: number): Observable<TramitePdaForm> {
        return this.http.get<TramitePdaForm>('puntotramite/puntosatencion/' + idPuntoAtencion + '/tramites/' + idTramitePda)
            .map((response: BackOfficeResponse<TramitePdaForm>) => {
                return response.result;
            });
    }

    editarTramitePdaInfo(idPuntoAtencion: number, idTramite: number, tramitePda: TramitePdaFormEdit): Observable<BackOfficeStatusResponse> {
          return this.http.put('puntosatencion/' + idPuntoAtencion + '/tramites/' + idTramite + '/update', {
            multiple:tramitePda.multiple,
            multiple_horizonte:tramitePda.multiple_horizonte,
            multiple_max:tramitePda.multiple_max,
            permite_otro:tramitePda.permite_otro,
            permite_otro_cantidad:tramitePda.permite_otro_cantidad,
            multiturno:tramitePda.multiturno,
            multiturno_cantidad:tramitePda.multiturno_cantidad,
            permite_prioridad:tramitePda.permite_prioridad,
            deshabilitar_hoy:tramitePda.deshabilitar_hoy
        }).map((response: BackOfficeStatusResponse) => {
            return response;
        });
    }    

}
