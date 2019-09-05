import { Component, OnInit } from '@angular/core';
import { AlertContextService } from './alert-context.service';
import * as R from 'ramda';

@Component({
    selector: 'app-alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit {

    alerts: Alert[]

    constructor(private alertService: AlertContextService) {
        this.alerts = [];
    }

    ngOnInit() {
        const alert = this.alertService.getAlert();
        if (alert) {
            this.alerts.push(alert);
            this.setTimeoutIfDismissible(alert);
        }
    }

    success(message: string) {
        const alert = this.alertService.success(message);
        this.alerts.push(alert);
        this.setTimeoutIfDismissible(alert);
    }

    error(message: string) {
        const alert = this.alertService.error(message);
        this.alerts.push(alert);
        this.setTimeoutIfDismissible(alert);
    }

    errors(messages: string[]) {
        messages.forEach((message: string) => {
            this.error(message);
        })
    }

    dissmisOnTimeout = (alert: Alert) => {
        this.alertService.dismiss(alert);
        this.alerts = R.reject(R.equals(alert), this.alerts);
    }

    setTimeoutIfDismissible(alert: Alert) {
        if (alert.dismissible) {
            setTimeout(this.dissmisOnTimeout, 3000, alert); // tslint:disable-line:no-magic-numbers
        }
    }
}
