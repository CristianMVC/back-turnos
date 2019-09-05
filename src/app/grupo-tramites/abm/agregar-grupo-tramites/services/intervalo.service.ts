import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpSNT } from '../../../../shared/services/http-snt';

@Injectable()
export class IntervaloService {

    constructor(private http: HttpSNT) { }

    getIntervaloDisponible(idPuntoAtencion: number): Observable<number[]> {
        return this.http.get<number[]>('horariosatencion/intervalos/' + idPuntoAtencion)
            .map((response: BackOfficeResponse<number[]>) => {
                return response.result;
            });
    }
}
