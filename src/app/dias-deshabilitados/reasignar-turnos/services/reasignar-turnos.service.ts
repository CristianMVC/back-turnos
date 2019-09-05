import { Injectable } from '@angular/core';
import { HttpSNT } from '../../../shared/services/http-snt';
import { create } from './reasignacion-info.factory';
import { createGrupoTramiteReasignacion } from './grupo-tramite-reasignacion.factory';

import * as R from 'ramda';

@Injectable()
export class ReasignarTurnoService {

    constructor(private http: HttpSNT) { }

    obtenerGruposDeTramites(puntoAtencionId: number, fecha: string) {
        return this.http.getTransformer(`turnos/${puntoAtencionId}/reasignacion`,
                    create, { fecha: fecha }).value;
    }

    obtenerGrupoDeTramite(puntoAtencionId: number, grupoTramiteId: number, fecha: string) {
        return this.http.getTransformer(`turnos/${puntoAtencionId}/reasignacion/${grupoTramiteId}`,
         createGrupoTramiteReasignacion, { fecha: fecha }).value;
    }

    reasignarTurnos(puntoAtencionId: number, fecha: string, grupoTramiteAcc: GrupoTramiteAccordion[]) {
        const fechaObject = (a: FechaArray): {[key: string]: number} => {
            return Object.assign({}, ...a.map(fechaElement => {
                fechaElement[R.keys(fechaElement)[0]] = fechaElement.cantidadAReasignar;
                return R.omit(['cantidadAReasignar', 'totalMaximo'], fechaElement);
            }))
        }
        const payload = {fecha: fecha, grupoTramites:
             Object.assign({}, ...grupoTramiteAcc.map(grupoTram =>
                 ({ [grupoTram.id]: fechaObject(grupoTram.fechasArray) }))) }
        return this.http.put(`turnos/${puntoAtencionId}/reasignacion`, payload)
                .map((response: BackOfficeStatusResponse) => {
                    return response;
                })
    }



}
