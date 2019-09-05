import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Maybe } from 'monet';

@Injectable()
export class WizardContextService {

    private criterio: SeleccionTurnoCriteria | undefined
    private _tramite: TurnosTramite | undefined
    private reservaResponse: ReservaTurnoResponse | undefined;
    private turno: Turno | undefined

    turnoReservado(reservaResponse: ReservaTurnoResponse, criterio: SeleccionTurnoCriteria) {
        this.reservaResponse = reservaResponse;
        this.criterio = criterio;
    }

    getSeleccionTurnoCriteria() {
        return R.clone(this.criterio);
    }

    createTurno(formValues: any): Turno | undefined {
        if (this.criterio && this.reservaResponse) {
            if (R.isNil(formValues.nombre) || R.isNil(formValues.apellido) || R.isNil(formValues.cuil) ||
                R.isNil(formValues.email)) {
                throw new TypeError('nombre, apellido, cuil, email are required');
            } else {
                this.turno = {
                    id: this.reservaResponse.turnoId,
                    codigo: this.reservaResponse.codigo,
                    alerta: 2,
                    campos: formValues
                };
                return this.turno;
            }
        } else {
            return undefined;
        }
    }

    tramite(tramite: TurnosTramite) {
        this._tramite = tramite;
    }

    getNombreTramite() {
        return this._tramite ? this._tramite.nombre : '';
    }

    getOrganismo() {
        return this._tramite ? this._tramite.organismo : '';
    }

    getTramiteId() {
        return this.criterio ? this.criterio.tramiteId : -1
    }

    getTramiteIdOnError() {
        return this._tramite && this._tramite.id;
    }

    hasCriteria() {
        return R.not(R.isNil(this.criterio));
    }

    hasTramite() {
        return R.not(R.isNil(this._tramite));
    }

    hasTurno() {
        return R.not(R.isNil(this.turno));
    }

    reset() {

        this.criterio = undefined;
        this.reservaResponse = undefined;
        this._tramite = undefined;
        this.turno = undefined;
    }

    getDatosTurno(): Maybe<VisualizacionConfirmacionTurno> {
        if (this._tramite && this.criterio && this.reservaResponse
             && this.criterio.fecha
             && this.criterio.puntoAtencion) {
           return Maybe.Some({
                id: this.reservaResponse.turnoId,
                codigo: this.reservaResponse.codigo,
                tramite: this._tramite.nombre,
                fecha: this.criterio.fecha,
                hora: this.criterio.hora,
                puntoAtencion: this.criterio.puntoAtencion,
                nombreArea: this._tramite.area
            })
        } else {
            return Maybe.None<VisualizacionConfirmacionTurno>();
        }
    }
}
