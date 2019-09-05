import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AgregarRangoService } from './services/agregar-rango.service';
import { DiasSemanaService } from '../../../shared/services/dias-semana.service';
import { AlertContextService } from '../../../shared/alert/alert-context.service';
import { AlertComponent } from '../../../shared/alert/alert.component';

import * as R from 'ramda';

@Component({
    selector: 'app-agregar-rango',
    templateUrl: 'agregar-rango.component.html',
    styleUrls: ['./agregar-rango.component.scss']
})

export class AgregarRangoComponent implements OnInit {
    idPuntoAtencion: number;
    editMode: boolean;
    rango: Rango;
    rangoForm: FormGroup;
    optionsHora: string[];
    optionsHoraHasta: string[];
    optionsMinutos: string[];
    optionsDias: string[];
    minutosInicio: string;
    minutosFin: string;

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(
        private agregarRangoService: AgregarRangoService,
        private diasSemanaService: DiasSemanaService,
        private alertContextService: AlertContextService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.idPuntoAtencion = this.route.snapshot.params['idPuntoAtencion']
        this.rango = this.route.snapshot.data['rango'] || {} as Rango;
        this.editMode = R.not(R.isEmpty(this.rango));
        this.optionsHora = this.route.snapshot.data['rangoHorario'] ? this.getHoras(this.route.snapshot.data['rangoHorario']) : {} as RangoHorario; // tslint:disable-line
        this.optionsHoraHasta = this.optionsHora;
        this.optionsMinutos = this.createMinutos();
        this.optionsDias = this.diasSemanaService.getDiasSemana();

        this.rangoForm = new FormGroup({
            horaInicio: new FormControl('', [
                Validators.required
            ]),
            minutosInicio: new FormControl('', [
                Validators.required
            ]),
            horaFin: new FormControl('', [
                Validators.required
            ]),
            minutosFin: new FormControl('', [
                Validators.required
            ]),
            diasSemana: new FormControl('', [
                Validators.required
            ]),
        });

        if (this.editMode) {
            this.splitRango();
            this.onDesdeSelect();
        }
    }

    splitRango() {
        this.minutosInicio = this.getMinutos(this.rango.horaInicio);
        this.minutosFin = this.getMinutos(this.rango.horaFin);
        this.rango.horaInicio = this.getHora(this.rango.horaInicio);
        this.rango.horaFin = this.getHora(this.rango.horaFin);
    }

    getHoras(optionsHora: string[]): string[] {
        return optionsHora.map((h) => {
            return this.getHora(h);
        })
    }

    getHora(hora: string): string {
        return hora.split(':')[0];
    }

    getMinutos(hora: string): string {
        return hora.split(':')[1];
    }

    isChecked(index: number) {
        return (this.rango.diasSemana && R.findIndex(R.equals(index))(this.rango.diasSemana) > -1);
    }

    onDiaChecked(index: number) {
        if (!this.rango.diasSemana) {
            this.rango.diasSemana = [];
        }
        const existIdx = R.findIndex(R.equals(index))(this.rango.diasSemana);

        if (existIdx > -1) {
            // deseleccionar dia
            this.rango.diasSemana.splice(existIdx, 1);
        } else {
            // seleccionar dia
            this.rango.diasSemana.push(index);
        }
    }

    equals(item1: any, item2: any): boolean {
        return (item1 && item2 && item1 === item2);
    }

    onDesdeSelect() {
        if (this.rango.horaInicio) {
            const index = R.findIndex(R.equals(this.rango.horaInicio))(this.optionsHora);
            if (index > -1) {
                this.optionsHoraHasta = this.optionsHora.slice(index + 1, this.optionsHora.length);
            }
        }
    }

    private createRango(form: FormGroup): NuevoRangoForm {
        return {
            horaInicio: form.value.horaInicio.concat(':', form.value.minutosInicio),
            horaFin: form.value.horaFin.concat(':', form.value.minutosFin),
            diasSemana: form.value.diasSemana,
            idRow: this.rango.idRow || 0
        }
    }

    private createMinutos(): string[] {
        return ['00', '15', '30', '45'];
    }

    isDirtyForm(): boolean {
        if (!this.rangoForm.dirty) {
            this.onSubmit();
            return false;
        }
        return true;
    }

    onSubmit() {
        if (this.rangoForm.valid) {
            const rango: NuevoRangoForm = this.createRango(this.rangoForm);

            if (this.editMode) {
                this.agregarRangoService.editarRango(this.idPuntoAtencion, rango)
                    .subscribe((response: BackOfficeStatusResponse) => {
                        this.alertContextService.success('Los cambios se han guardado exitosamente');
                        this.alertContextService.warning('La disponibilidad para el rango modificado se volvió a 0.'
                            + ' No olvides actualizarla desde Grupo de Trámites.');
                        this.salir();
                    }, ((err: ErrorSNT) => {
                        this.alertComponent.errors(err);
                    }));
            } else {
                this.agregarRangoService.agregarRango(this.idPuntoAtencion, rango)
                    .subscribe((response: BackOfficeStatusResponse) => {
                        this.alertContextService.success('El rango de horarios se ha creado exitosamente');
                        this.salir();
                    }, ((err: ErrorSNT) => {
                        this.alertComponent.errors(err);
                    }));
            }
        }
    }

    salir() {
        return (this.editMode ?
            this.router.navigate(['../../'], { relativeTo: this.route }) :
            this.router.navigate(['../'], { relativeTo: this.route }));
    }
}
