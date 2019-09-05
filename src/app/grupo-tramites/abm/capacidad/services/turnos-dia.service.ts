import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as R from 'ramda';

const timeFormat = 'HH:mm';

@Injectable()
export class TurnosDiaService {
    totalesDia: number[];

    constructor( ) { }

    getTotalTurnos(capacidad: Disponibilidad, intervalo: number): number {
        const momentInicio = moment(capacidad.horaInicio, timeFormat);
        const momentFin = moment(capacidad.horaFin, timeFormat);
        const durationInHours = moment.duration(momentFin.diff(momentInicio)).asHours();

        // tslint:disable-next-line
        const intervalosHora = 60/intervalo;

        return (durationInHours * intervalosHora * capacidad.cantidadTurnos) || 0;
    }

    getTotalesDia(capacidades: Disponibilidad[], intervalo: number): number[] {
        this.totalesDia = [0, 0, 0, 0, 0, 0, 0];
        let totalTurnos: number;
        capacidades.forEach((c) => {
            totalTurnos = this.getTotalTurnos(c, intervalo);
            this.agregarTurnosDias(c.diasSemana, totalTurnos);
        });
        return this.totalesDia;
    }

    private agregarTurnosDias(dias: number[], totalTurnos: number)  {
        R.values(dias).forEach((d) => {
            this.totalesDia[+d - 1] += totalTurnos;
        });
    }
}
