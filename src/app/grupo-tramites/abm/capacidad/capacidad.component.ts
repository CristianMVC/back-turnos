import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

import { FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { CapacidadService } from './services/capacidad.service';
import { DiasSemanaService } from '../../../shared/services/dias-semana.service';
import { TurnosDiaService } from './services/turnos-dia.service';
import * as R from 'ramda';

@Component({
    selector: 'app-capacidad',
    styleUrls: ['/capacidad.component.scss'],
    templateUrl: 'capacidad.component.html'
})


export class CapacidadComponent implements OnInit {

    private _intervalo: number;
    @Output() capacidadSavedEvent: EventEmitter<EntityEditionStatus> = new EventEmitter<EntityEditionStatus>()
    @Input() idPuntoAtencion: number;
    @Input() idGrupoTramites: number;

    get intervalo(): number {
        return this._intervalo;
    }

    @Input()
    set intervalo(intervalo: number) {
        this._intervalo = intervalo;
        if (this.myCapacidad) {
            this.getTotalesDia();
        }
    }

    listaCapacidad: Disponibilidad[];
    myCapacidad: Disponibilidad[];
    editMode: boolean;
    diasSemana: string[];
    totalesDia: number[];

    rangosSuperpuestos: number[] = [];
    rangoSeleccionado = -1;

    constructor(
        private capacidadService: CapacidadService,
        private diasSemanaService: DiasSemanaService,
        private turnosDiaService: TurnosDiaService,
        public fd: FormGroupDirective
    ) { }

    ngOnInit() {
        this.editMode = this.idGrupoTramites !== undefined;

        if (this.editMode) {
            this.capacidadService.getCapacidad(this.idPuntoAtencion, this.idGrupoTramites)
            .subscribe((response: any) => {
                this.listaCapacidad = response;
                this.myCapacidad = R.clone(response);
                this.getTotalesDia();
                this.agregarFormControlsCapacidad();
            });
        } else {
            this.capacidadService.getRangos(this.idPuntoAtencion)
            .subscribe((response: any) => {
                this.listaCapacidad = response;
                this.myCapacidad = R.clone(this.listaCapacidad);
                this.agregarFormControlsCapacidad();
            });
        }

        this.diasSemana = this.diasSemanaService.getDiasSemana();
    }

    private agregarFormControlsCapacidad() {
        // agregar controles al form
        if (this.myCapacidad) {
            this.myCapacidad.forEach((item: Disponibilidad, index: number) => {
                this.fd.form.addControl('capacidad' + item.idRow,
                    new FormControl('', [Validators.min(0), Validators.max(500)]) // tslint:disable-line:no-magic-numbers
                )
            });
        }
    }

    showDias(dias: number[]): string[] {
        return dias.sort().map((dia: number) => {
            return this.diasSemana[dia - 1];
        });
    }

    guardarCapacidad(idGrupoTramites: number) {
        const capacidadEditada: Disponibilidad[] = this.myCapacidad
            .filter((disp: Disponibilidad, index: number) => {
                return disp.cantidadTurnos !== this.listaCapacidad[index].cantidadTurnos;
            });

        if (capacidadEditada.length === 0) {
            // no hay capacidad para guardar
            this.capacidadSavedEvent.emit({status: 'ok'});
        } else {
            const requestList = capacidadEditada.map((capacidad: Disponibilidad) => {
                return this.capacidadService.setCapacidad(
                    this.idPuntoAtencion,
                    idGrupoTramites,
                    capacidad.cantidadTurnos,
                    capacidad.idRow
                )
            });

            Observable.forkJoin(requestList).subscribe(results => {
                const success = results.reduce(function(valorAnterior, valorActual) {
                    const okState = 200;
                    return valorAnterior && (valorActual.code === okState);
                }, true);
                if (success) {
                    this.capacidadSavedEvent.emit({status: 'ok'});
                } else {
                    this.capacidadSavedEvent.emit({status: 'error'});
                }
            });
        }
    }

    getTotalTurnos(c: Disponibilidad): number {
        return this.turnosDiaService.getTotalTurnos(R.clone(c), R.clone(this._intervalo));
    }

    onTurnosChange() {
        if (!this.checkRangosSuperpuestos()) {
            this.getTotalesDia();
        }
    }

    private getTotalesDia() {
        this.totalesDia = this.turnosDiaService.getTotalesDia(R.clone(this.myCapacidad), R.clone(this._intervalo));
    }

    isRowOverlapped(idRow: number): boolean {
        return (this.rangosSuperpuestos && R.indexOf(idRow, this.rangosSuperpuestos) > -1);
    }

    overlappedRanges(): boolean {
        return (this.rangosSuperpuestos && this.rangosSuperpuestos.length > 0);
    }

    private checkRangosSuperpuestos(): boolean {
        const rangosSuperpuestos: number[] = [];

        if (this.myCapacidad.length > 1) {
          this.myCapacidad.forEach((rangoI: Disponibilidad) => {
            this.myCapacidad.forEach((rangoJ: Disponibilidad) => {
              if (rangoI.idRow !== rangoJ.idRow
                  && rangoI.cantidadTurnos > 0 && rangoJ.cantidadTurnos > 0
                  && this.checkDiasSuperpuestos(rangoI, rangoJ)
                  && this.checkHorasSuperpuestas(rangoI, rangoJ)) {
                rangosSuperpuestos.push(rangoI.idRow);
                rangosSuperpuestos.push(rangoJ.idRow);
              }
            })
          })
          this.rangosSuperpuestos = rangosSuperpuestos;
        }

        return (rangosSuperpuestos.length > 0);
    }

    private checkHorasSuperpuestas(rangoI: Disponibilidad, rangoJ: Disponibilidad): boolean {
        return ((rangoI.horaInicio <= rangoJ.horaInicio && rangoI.horaFin > rangoJ.horaFin) ||
                (rangoJ.horaInicio <= rangoI.horaInicio && rangoJ.horaFin > rangoI.horaFin) ||
                (rangoI.horaInicio <= rangoJ.horaInicio && rangoJ.horaInicio < rangoI.horaFin) ||
                (rangoJ.horaInicio <= rangoI.horaInicio && rangoI.horaInicio < rangoJ.horaFin))
    }

    private checkDiasSuperpuestos(rangoI: Disponibilidad, rangoJ: Disponibilidad): boolean {
        const diasSuperpuestos = R.intersection(rangoI.diasSemana, rangoJ.diasSemana);
        return (diasSuperpuestos.length > 0);
    }

}
