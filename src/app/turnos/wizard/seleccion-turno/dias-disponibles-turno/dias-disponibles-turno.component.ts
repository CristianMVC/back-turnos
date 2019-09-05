import { Output, Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DiasDisponiblesTurnoService } from './dias-disponibles-turno.service'
import { SetOptions } from 'eonasdan-bootstrap-datetimepicker';
import { LoadingStatus } from '../../../shared/loading/loading-status';

import * as R from 'ramda';
import * as moment from 'moment';

@Component({
    selector: 'app-dias-disponibles-turno',
    templateUrl: './dias-disponibles-turno.component.html',
    styleUrls: ['./dias-disponibles-turno.component.scss']
})
export class DiasDisponiblesTurnoComponent implements OnInit {

    criterio: SeleccionTurnoCriteria
    visibility: boolean
    private horizonte: number
    private loading: LoadingStatus;

    @Output() fechaTurnoChangeEvent: EventEmitter<moment.Moment> = new EventEmitter<moment.Moment>()
    @Output() verHorariosEvent: EventEmitter<LoadingStatus> = new EventEmitter<LoadingStatus>()

    datepickerOptions: SetOptions

    constructor(private route: ActivatedRoute,
        private diasDisponiblesTurnoService: DiasDisponiblesTurnoService) { }

    ngOnInit() {
        this.visibility = false;
        this.criterio = {} as SeleccionTurnoCriteria;
        this.horizonte = this.route.snapshot.data['horizonte'];
        this.datepickerOptions = this.createDatePickerOptions( moment().startOf('day') );
        this.loading = new LoadingStatus();
    }

    onChange(criterio: SeleccionTurnoCriteria) {
        this.criterio = criterio;
        if (this.criterio.fecha === undefined) {
            this.criterio.fecha = moment().startOf('day');
        }
        this.visibility = false;
        return this.updateDatePicker(this.criterio.fecha);
    }

    onUpdateDatePicker(date: moment.Moment) {
        return this.updateDatePicker(date);
    }

    dateChange(date: moment.Moment) {
        const myDate = moment(date).startOf('day');
        this.criterio.fecha = myDate
        this.fechaTurnoChangeEvent.emit(myDate);
    }

    getFechaSeleccionada() {
        return this.criterio.fecha;
    }

    isDisabled() {
        return R.isNil(this.criterio.fecha) || this.isLoading();
    }

    reset() {
        this.criterio.fecha = undefined;
        this.visibility = false;
        this.fechaTurnoChangeEvent.emit(this.criterio.fecha);
    }

    display() {
        this.visibility = true;
    }

    isVisible() {
        return this.visibility;
    }

    verHorarios() {
        this.loading.start();
        this.verHorariosEvent.emit(this.loading);
    }

    isLoading() {
        return this.loading.status();
    }

    private updateDatePicker = (date: moment.Moment): Promise<void> => {
        const disabledDates = this.diasDisponiblesTurnoService.createRange(date, this.horizonte);
        return this.diasDisponiblesTurnoService.getDiasDeTurnosDisponibles(this.criterio).toPromise().then((enableDates: Date[]) => {
            this.datepickerOptions = this.updateDatePickerOptions(this.datepickerOptions, enableDates, disabledDates);
        });
    }

    private createDatePickerOptions(date: moment.Moment): SetOptions {
        return {
            format: 'DD/MM/YYYY',
            disabledDates: this.diasDisponiblesTurnoService.createRange(date, this.horizonte),
            inline: true,
            debug: true,
            enabledDates: [],
            locale: moment.locale('es'),
            tooltips: {
                today: 'Hoy',
                clear: 'Limpiar selección',
                close: 'Cerrar',
                selectMonth: 'Seleccionar mes',
                prevMonth: 'Mes anterior',
                nextMonth: 'Mes siguiente',
                selectYear: 'Seleccionar año',
                prevYear: 'Año anterior',
                nextYear: 'Próximo año',
                selectDecade: 'Seleccionar década',
            }
        }
    }

    private updateDatePickerOptions(datepickerOptions: SetOptions, enableDates: Date[], disableDates: moment.Moment[]): SetOptions {
        const options = R.omit(['format', 'locale', 'tooltips'], R.clone(datepickerOptions));
        const today = moment().startOf('day');
        const firstEnabled = moment(enableDates[0]);

        options.disabledDates = disableDates;
        options.enabledDates = enableDates;

        if (this.criterio.fecha && !this.criterio.fecha.isSame(firstEnabled) && firstEnabled.isAfter(today)) {
            // updating default selected date to 1st date enabled
            this.criterio.fecha = firstEnabled;
        }
        return options;
    }

}
