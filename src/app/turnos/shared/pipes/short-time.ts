import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'shortTime' })
export class ShortTimePipe implements PipeTransform {
    transform(time: string): string {
        // tslint:disable-next-line:no-magic-numbers
        return time ? time.substring(0, 5) : time;
    }
}
