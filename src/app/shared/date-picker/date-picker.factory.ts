import { SetOptions } from 'eonasdan-bootstrap-datetimepicker';

import * as moment from 'moment';
import * as R from 'ramda';

export class DatePickerFactory {

    static create(disabledDates: moment.Moment[]): SetOptions {
        return {
            format: 'DD/MM/YYYY',
            disabledDates: disabledDates,
            minDate: moment(),
            inline: true,
            debug: true,
            enabledDates: [],
            locale: moment.locale('es'),
            defaultDate: moment(),
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
        };
    }

    static updateDatePickerOptions(datepickerOptions: SetOptions, disableDates: moment.Moment[]): SetOptions {
        const options = R.omit(['format', 'locale', 'tooltips', 'enabledDates', 'defaultDate'], R.clone(datepickerOptions));
        options.disabledDates = disableDates;
        return options;
    }
}
