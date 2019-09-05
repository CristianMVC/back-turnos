import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AlertContextService } from './alert-context.service';
import * as R from 'ramda';

@Component({
    selector: 'app-alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit, AfterViewInit, OnDestroy {

    alerts: Alert[];

    constructor(private alertService: AlertContextService) {
        this.alerts = [];
    }

    ngOnInit() {
        const alert = this.alertService.getAlert();
        if (alert) {
            this.alerts.push(alert);
            this.setTimeoutIfDismissible(alert);
        }
        const warning = this.alertService.getWarning();
        if (warning) {
            this.alerts.push(warning);
            this.setTimeoutIfDismissible(warning);
        }
    }

    ngAfterViewInit() {
        this.scrollToTop();
    }

    ngOnDestroy() {
        this.alerts.forEach((alert: Alert) => {
            this.dismissAlert(alert)
        });
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

    warning(message: string) {
        const alert = this.alertService.warning(message);
        this.alerts.push(alert);
    }

    errors(messages: string[]) {
        messages.forEach(message => this.error(message));
    }

    dismissAlert (alert: Alert) {
        this.alertService.dismiss(alert);
        this.alerts = R.reject(R.equals(alert), this.alerts);
    }

    setTimeoutIfDismissible(alert: Alert) {
        if (alert.dismissible) {
            let dismissTime = 30000;
            if (this.successAlertOpened()) {
                dismissTime = 15000; // tslint:disable-line:no-magic-numbers
            }
            setTimeout(() => this.dismissAlert(alert), dismissTime, alert);
        }
    }

    successAlertOpened() {
        return this.alerts && R.any(a => a.type === 'success', this.alerts);
    }

    scrollToTop() {
        window.scrollTo(0, 0);
    }

}
