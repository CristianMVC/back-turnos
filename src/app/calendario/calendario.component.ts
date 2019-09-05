import { Component, OnInit, ViewChild } from '@angular/core';
import { SetOptions } from 'eonasdan-bootstrap-datetimepicker';
import { ActivatedRoute } from '@angular/router';

import { CalendarioService } from './services/calendario.service';
import { DatePickerFactory } from '../shared/date-picker/date-picker.factory';
import { AlertComponent } from '../shared/alert/alert.component';

import * as moment from 'moment';
import * as R from 'ramda';

@Component({
    selector: 'app-calendario',
    templateUrl: './calendario.component.html',
    styleUrls: ['./calendario.component.scss']
})

export class CalendarioComponent implements OnInit {
    datepickerOptions: SetOptions
    selectedDate: moment.Moment
    feriados: moment.Moment[]
    proximosFeriados: moment.Moment[]

    @ViewChild(AlertComponent)
    private alertComponent: AlertComponent;

    constructor(
        private route: ActivatedRoute,
        private calendarioService: CalendarioService) {
        this.route.params.subscribe(params => {
            this.feriados = this.route.snapshot.data['feriados']
        });
    }

    ngOnInit() {
        this.datepickerOptions = DatePickerFactory.create(this.feriados);
        this.proximosFeriados = this.getProximosFeriados();
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

    setFeriadoNacional() {
        this.calendarioService.agregarFeriadoNacional(moment(this.selectedDate).format('YYYY-MM-DD'))
            .subscribe((response: any) => {
                this.alertComponent.success(response.userMessage);
            }, ((err: ErrorSNT) => {
                this.alertComponent.errors(err);
            }), () => {
                this.updateFeriados();
            });
    }

    private updateFeriados() {
        return this.calendarioService.getFeriados().subscribe((feriados: moment.Moment[]) => {
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
}
