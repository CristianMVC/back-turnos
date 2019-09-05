import * as moment from 'moment';

export class CalendarioFactory {
    static create(result: any): moment.Moment[] {
        return result && result.map((fecha: any) => {
            return moment(fecha);
        });
    }
}
