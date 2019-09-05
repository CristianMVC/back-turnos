import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import * as moment from 'moment';

@Component({
    selector: 'app-countdown',
    templateUrl: './countdown.component.html'
})

export class CountdownComponent implements OnInit {
    @Input() duracion: moment.Duration

    @Output() tiempoExpirado: EventEmitter<boolean> = new EventEmitter<boolean>();

    duracionAsString: string;

    ngOnInit() {
        this.startCountdown(this.duracion);
    }

    private startCountdown(duracion: moment.Duration) {
        const delay = 1000;
        const timerObservable = Observable.timer(0, delay)
            .map(i => this.duracion.subtract(1, 'seconds'))
            .take(this.duracion.asSeconds());

        timerObservable.subscribe(
            i => {
                this.duracionAsString = moment.utc(this.duracion.asMilliseconds()).format('mm:ss');
            },
            error => { },
            () => this.emitExpiration()
        );
    }

    private emitExpiration() {
        this.tiempoExpirado.emit();
    }
}
