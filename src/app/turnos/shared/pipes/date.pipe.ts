import { PipeTransform, Pipe } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'fulldate' })
export class FulldatePipe implements PipeTransform {
    transform(myDate: Date): string {
        if (!myDate) {
            return '';
        }
        return moment(myDate).format('dddd LL');
    }
}
