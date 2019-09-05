import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { ReasignarTurnosComponent } from './reasignar-turnos.component';
import * as moment from 'moment';
import { DiasDeshabilitadosTramiteService } from '../services/dias-deshabilitados-tramite.service';
import { AlertContextService } from '../../../shared/alert/alert-context.service';

@Component({
    selector: 'app-modal-reasignar-turnos-tramite',
    templateUrl: 'modal-reasignar-turnos.component.html',
    styleUrls: ['modal-reasignar-turnos.component.scss']
})

export class ModalReasignarTurnosTramiteComponent {

    @Output() turnosReasignadosEvent: EventEmitter<SuccessStatus> =
        new EventEmitter<SuccessStatus>();

    @ViewChild(ModalComponent)
    private modalComponent: ModalComponent;

    @ViewChild(ReasignarTurnosComponent)
    private reasignarComponent: ReasignarTurnosComponent;

    private selectedDate: moment.Moment | undefined;
    idPuntoAtencion: number;
    idTramite: number;
    fecha: string;
    formattedDate: string;
    confirmed = false;

    constructor(
        private diasDeshabilitadosService: DiasDeshabilitadosTramiteService,
        private alertContextService: AlertContextService
    ) { }

    show(selectedDate: moment.Moment, idPuntoAtencion: number, idTramite:number) {
        this.confirmed = false;
        this.selectedDate = selectedDate;
        this.formattedDate = selectedDate ? selectedDate.format('YYYY-MM-DD') : '';
        this.fecha = selectedDate.format('DD-MM-YYYY');
        this.idPuntoAtencion = idPuntoAtencion;
        this.idTramite = idTramite;

        setTimeout(() => {
            this.reasignarComponent.activate();
            this.modalComponent.show();
        }, 100); // tslint:disable-line:no-magic-numbers
    }

    hide() {
        this.modalComponent.hide();
        this.confirmed = false;
        this.selectedDate = undefined;
        this.fecha = '';
    }

    turnosReasignados(status: SuccessStatus) {
        // pass event to diasDeshabilitados
        this.turnosReasignadosEvent.emit(status);
        this.hide();
    }

    salirSinConfirmar() {
        this.hide();
    }

    continuar() {
        const selectedDate = this.selectedDate ? this.selectedDate.format('YYYY-MM-DD') : '';
        this.diasDeshabilitadosService.deshabilitarDiaSinImportarTurnos(this.idPuntoAtencion, selectedDate, this.idTramite)
            .subscribe(() => {
                this.confirmed = true;
            }, (error) => {
                this.alertContextService.error(error);
                this.hide();
            });
    }

    reasignarTurnos() {
        this.reasignarComponent.onSubmit();
    }

    salir() {
        const selectedDate = this.selectedDate ? this.selectedDate.format('YYYY-MM-DD') : '';
        this.diasDeshabilitadosService.eliminarDiaDeshabilitadoTramite(this.idPuntoAtencion, selectedDate, this.idTramite)
            .subscribe(() => {
                this.hide();
            }, (error) => {
                this.alertContextService.error(error);
                this.hide();
            });
    }
}

