// tslint:disable:no-magic-numbers
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { TramitesService } from '../../wizard/busqueda-tramite/services/tramites.service';
import { ReservaTurnoService } from '../../wizard/seleccion-turno/services/reserva-turno.service';
import { ConfirmarTurnoService } from '../../wizard/datos-tramite/services/confirmar-turno.service';
import { HorariosDisponiblesService } from '../../wizard/seleccion-turno/horarios-disponibles-turno/horarios-disponibles.service';

import * as moment from 'moment';
import * as R from 'ramda';

export interface ConfirmacionResponse {
    id: number,
    codigo: string,
    cuil: string
}

@Injectable()
export class TestHelper {

    constructor(private tramiteService: TramitesService,
        private reservaTurnoService: ReservaTurnoService,
        private confirmarTurnoService: ConfirmarTurnoService,
        private horariosService: HorariosDisponiblesService
    ) { }


    getTramites() {
        const keywords: string[] = [];
        return this.tramiteService.getTramites(keywords);
    }

    createReservaTurno(tramiteId: number, hora: string, puntoAtencion: TurnosPuntoAtencion, turnoDate: moment.Moment) {
        return {
            puntoatencion: puntoAtencion.id,
            tramite: tramiteId,
            fecha: turnoDate.format('YYYY-MM-DD'),
            hora: hora,
            alerta: 1,
            origen: 1
        }
    }

    reservarTurno() {
        const puntoAtencion = { id: 1 } as TurnosPuntoAtencion;
        return this.getTramites().flatMap((results: TurnosTramitesPaginables) => {
            const tramiteId = 26;
            const turnoDate = this.getWeekDate();
            return this.horariosService.getHorarios(tramiteId, turnoDate, puntoAtencion).flatMap((horarios: Horario[]) => {
                const horariosDisponibles = R.filter(R.propEq('disponible', true), horarios);
                if (horariosDisponibles.length > 0) {
                    const reservacion = this.createReservaTurno(tramiteId, horariosDisponibles[0].hora, puntoAtencion, turnoDate);
                    return this.reservaTurnoService.reservarTurno(reservacion);
                } else {
                    return Observable.throw({
                        errors: ['No existen horarios disponibles para tramite ' + tramiteId + ' fecha '
                            + turnoDate.toISOString() + ' puntoAtencion ' + puntoAtencion.id]
                    });
                }
            });
        });
    }

    confirmarTurno(): Observable<ConfirmacionResponse> {
        return this.reservarTurno().flatMap((response: ReservaTurnoResponse) => {
            const turno = this.createTurno(response);
            return this.confirmarTurnoService.confirmarTurno(turno).flatMap(() => {
                return new Observable((observer) => {
                    observer.next({ id: response.turnoId, codigo: response.codigo, cuil: turno.campos.cuil });
                    observer.complete();
                });
            });
        });
    }


    createTurno(response: ReservaTurnoResponse): Turno {
        return {
            id: response.turnoId,
            codigo: response.codigo,
            alerta: 2,
            campos: {
                nombre: 'nombre',
                apellido: 'apellido',
                cuil: '27143752378',
                email: 'e@mail.com',
                telefono: '1234',
            }
        }
    }

    isTurnoFueraDeRangoDeAtencion(errors: string[]) {
        // tslint:disable-next-line:max-line-length
        return R.equals(['El turno que elegiste ya no está disponible porque fue reservado recientemente por otra persona. Podés volver a reservar otro turno.'],
            R.values(errors))
    }

    private getWeekDate() {
        const currentDate = moment().day();
        if (currentDate === 5) {
            return moment().add(3, 'days')
        }

        if (currentDate === 6) {
            return moment().add(2, 'days')
        }

        return moment().add(1, 'days')
    }

}
