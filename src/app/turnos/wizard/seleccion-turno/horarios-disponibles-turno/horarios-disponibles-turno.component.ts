import { Component, Output, EventEmitter } from '@angular/core';
import * as R from 'ramda';

import { HorariosDisponiblesService } from './horarios-disponibles.service';

@Component({
    selector: 'app-horarios-disponibles-turno',
    templateUrl: './horarios-disponibles-turno.component.html',
    styleUrls: ['./horarios-disponibles-turno.component.scss']
})
export class HorariosDisponiblesTurnoComponent {

    private horarios: Horario[]
    private fechaTurno: moment.Moment
    horarioSelected: Horario;

    @Output() horarioTurnoChangeEvent: EventEmitter<string> = new EventEmitter<string>()

    constructor(private horarioDisponiblesService: HorariosDisponiblesService) { }


    updateHorarios(tramiteId: number, fechaTurno: moment.Moment | undefined, puntoAtencion: TurnosPuntoAtencion | undefined) {
        if (fechaTurno !== undefined && puntoAtencion !== undefined) {
            this.fechaTurno = fechaTurno;
            return this.horarioDisponiblesService.getHorarios(tramiteId, fechaTurno, puntoAtencion)
            .toPromise().then((horarios: Horario[]) => {
                this.horarios = horarios;
                this.horarioSelected = {} as Horario
                this.emitHorarioTurnoChange();
            });
        } else {
            this.reset();
            return Promise.resolve();
        }
    }

    selectHorario(hora: string) {
        const horario = this.horarios.find((h => hora === h.hora));
        if (horario) {
            this.horarioSelected = horario;
            this.emitHorarioTurnoChange();
        }
    }

    hasHorarioSelected() {
        return R.not(R.isNil(this.horarioSelected)) && R.has('hora', this.horarioSelected);
    }

    hasHorarios() {
        return R.not(R.isNil(this.horarios)) && R.not(R.isEmpty(this.horarios));
    }

    reset() {
        this.horarios = [];
        this.horarioSelected = {} as Horario;
        this.emitHorarioTurnoChange();
    }

    isSelected(horario: Horario) {
        return R.equals(this.horarioSelected, horario);
    }

    emitHorarioTurnoChange() {
        this.horarioTurnoChangeEvent.emit(this.horarioSelected.hora);
    }
}
