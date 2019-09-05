import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Either } from 'monet';
import { ReasignarTurnoService } from './services/reasignar-turnos.service';
import * as R from 'ramda';
import { AlertComponent } from '../../shared/shared.module';

@Component({
    selector: 'app-reasignar-turnos',
    templateUrl: 'reasignar-turnos.component.html',
    styleUrls: ['reasignar-turnos.component.scss']
})

export class ReasignarTurnosComponent  {

    @Input() fecha: string;
    @Input() idPuntoAtencion: number;
    @Output() turnosReasignadosEvent: EventEmitter<SuccessStatus> =
        new EventEmitter<SuccessStatus>()

    private infoReasignacion: ReasignacionInfo;
    private accordionGrupoTramite: GrupoTramiteAccordion[];
    private reasignarForm: FormGroup;

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(
        private reasignarTurnosService: ReasignarTurnoService,
    ) { }

    activate() {
        this.reasignarForm = new FormGroup({});
        this.accordionGrupoTramite = [];

        this.reasignarTurnosService
            .obtenerGruposDeTramites(this.idPuntoAtencion, this.fecha)
            .subscribe((response: any) => {
                this.infoReasignacion = response.value;

                this.infoReasignacion.grupoTramites.forEach(grupoTramite => {
                    this.accordionGrupoTramite.push(
                        Object.assign({}, grupoTramite, {
                             isOpened: false, fechasArray: [], totalTurnosAMostrar: grupoTramite.totalTurnos, modified: false }))
                });
        });
    }

    toggle(grupoTramite: GrupoTramiteAccordion ) {
        if (!grupoTramite.modified) {
            grupoTramite.modified = true;
            this.reasignarTurnosService.obtenerGrupoDeTramite(this.idPuntoAtencion, grupoTramite.id, this.fecha).subscribe(value => {
                value.cata((errors) => {
                    this.alertComponent.errors(errors);
                }, val => {
                    R.keys(val.fechas).forEach(fecha => {
                        const fechaElement: FechaElement = {
                            [fecha]: val.fechas ? val.fechas[fecha] : 0 , cantidadAReasignar: 0, totalMaximo: 0
                         };
                        fechaElement.totalMaximo = grupoTramite.totalTurnosAMostrar;
                        grupoTramite.fechasArray.push(fechaElement);
                    });
                    grupoTramite.fechasArray.forEach(fecha => {
                        this.reasignarForm.addControl('fecha' + this.getKey(fecha),
                        new FormControl('', [Validators.min(0), Validators.max(fecha.totalMaximo)]) // tslint:disable-line:no-magic-numbers
                    )});

                    grupoTramite.isOpened = !grupoTramite.isOpened;
                })
            })
        } else {
            grupoTramite.isOpened = !grupoTramite.isOpened;
        }
    }

    updateReasignacion(g: GrupoTramiteAccordion) {
        const sumado = R.sum(g.fechasArray.map(fecha => fecha.cantidadAReasignar));
        g.totalTurnosAMostrar = g.totalTurnos - sumado;
        g.fechasArray.forEach(fecha => { fecha.totalMaximo = fecha.cantidadAReasignar + g.totalTurnosAMostrar });
    }

    onSubmit() {
        if (this.reasignarForm.valid) {
            this.todosLosTurnosReasignados().cata(
                (error) => {
                    this.alertComponent.error(error);
                },
                () => {
                    this.reasignarTurnosService.reasignarTurnos(this.idPuntoAtencion, this.fecha, this.accordionGrupoTramite)
                        .subscribe((response: BackOfficeStatusResponse) => {
                            this.turnosReasignadosEvent.emit(<SuccessStatus>({ id: 0, message: response.userMessage }));
                        },
                        (e => this.alertComponent.errors(e)));
                })
        } else {
            this.alertComponent.error('Faltan turnos por reasignar');
        }
    }

    todosLosTurnosReasignados() {
        return R.all<GrupoTramiteAccordion>(a => a.totalTurnosAMostrar === 0, this.accordionGrupoTramite)
        ? Either.Right<string, {}>({})
        : Either.Left<string, {}>('Faltan turnos por reasignar');
    }

    getKey(o: Object) {
        return R.keys(o)[0];
    }

    getValue(o: Object) {
        return R.values(o)[0];
    }

}

