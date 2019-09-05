
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SetOptions } from 'eonasdan-bootstrap-datetimepicker';
import { Either } from 'monet';
import { DiasDeshabilitadosTramiteService } from './services/dias-deshabilitados-tramite.service';
import { DatePickerFactory } from '../../shared/date-picker/date-picker.factory';
import { AlertComponent } from '../../shared/shared.module';
import { ModalReasignarTurnosTramiteComponent } from './reasignar-turnos/modal-reasignar-turnos.component';

import * as moment from 'moment';
import * as R from 'ramda';

@Component({
    selector: 'app-dias-deshabilitados-tramites', 
    templateUrl: './dias-deshabilitados-tramite.component.html',
    styleUrls: ['./dias-deshabilitados-tramite.component.scss']
})

export class DiasDeshabilitadosTramiteComponent implements OnInit {
    idPuntoAtencion: number;
    datepickerOptions: SetOptions;
    selectedDate: moment.Moment;
    feriados: moment.Moment[];
    proximosFeriados: moment.Moment[];
    tramitepda:TramitePda;
    idTramite:number;

    @ViewChild(ModalReasignarTurnosTramiteComponent)
    private modalReasignar: ModalReasignarTurnosTramiteComponent;

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(private route: ActivatedRoute,
        private diasDeshabilitadosService: DiasDeshabilitadosTramiteService) {
        this.tramitepda = this.route.snapshot.data['tramitepda'] || {} as TramitePda;
        this.idTramite = this.route.snapshot.params['idTramite'];
        this.route.params.subscribe(params => {
            this.idPuntoAtencion = +params['idPuntoAtencion'];
            this.feriados = this.route.snapshot.data['diasDeshabilitados'];
        });
    }

    ngOnInit() {
        this.datepickerOptions = DatePickerFactory.create(this.feriados);
        this.proximosFeriados = this.getProximosFeriados();
        this.selectedDate = moment(this.datepickerOptions.defaultDate).startOf('day');
    }

    dateChange(date: moment.Moment) {
        this.selectedDate = moment(date).startOf('day');
    }

    isDateSelected() {
        return R.not(R.isNil(this.selectedDate));
    }

    isTodaySelected() {
        return this.selectedDate.isSame(moment().startOf('day'));
    }

    deshabilitarDia() {
        this.diasDeshabilitadosService.deshabilitarDia(this.idPuntoAtencion, moment(this.selectedDate).format('YYYY-MM-DD'), this.idTramite)
            .subscribe((response: BackOfficeStatusResponse) => {
                this.alertComponent.success(response.userMessage);
            }, ((err: ErrorSNT) => {
                // si la fecha tiene turnos asignados muestra el modal
                if (err.some(msg => msg.indexOf('posee turnos asignados') > -1)) {
                    this.modalReasignar.show(this.selectedDate, this.idPuntoAtencion, this.idTramite);
                } else {
                    this.alertComponent.errors(err);
                }
            }), () => {
                this.updateFeriados();
            });
    }

    private updateFeriados() {
        return this.diasDeshabilitadosService.getDiasDeshabilitados(this.idPuntoAtencion,this.idTramite)
            .subscribe((feriados: moment.Moment[]) => {
                this.feriados = feriados;
                this.proximosFeriados = this.getProximosFeriados();
                this.datepickerOptions = DatePickerFactory.updateDatePickerOptions(this.datepickerOptions, this.feriados);
            }, ((err: ErrorSNT) => {
                this.alertComponent.errors(err);
            }), () => { });
    }

    habilitarDia() {
        this.updateFeriados();
    }

    getProximosFeriados() {
        const today = moment().startOf('day');
        return this.feriados
            .filter((feriado) => {
                return feriado >= today;
            })
            .sort((a: moment.Moment, b: moment.Moment): number => {
                if (moment(a).isBefore(moment(b))) {
                    return -1;
                } else if (moment(b).isBefore(moment(a))) {
                    return 1;
                } else {
                    return 0;
                }
            });
    }

    turnoCancelado(status: Either<ErrorStatus, SuccessStatus>) {
        status.cata((err: ErrorStatus) => {
            this.updateFeriados();
            this.alertComponent.errors(err.message);
        }, (suc: SuccessStatus) => {
            this.updateFeriados();
            this.alertComponent.success(suc.message);
        });
    }

    turnosReasignados(status: SuccessStatus) {
        this.updateFeriados();
        this.alertComponent.success(status.message);
    }
}
