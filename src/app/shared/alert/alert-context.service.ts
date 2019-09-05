import { Injectable } from '@angular/core';
import * as R from 'ramda';

@Injectable()
export class AlertContextService {

    private _alert: Alert | undefined;
    private _warning: Alert | undefined;

    success(message: string): Alert {
        return this.createAlert('success', '', message, 'check', true);
    }

    error(message: string) {
        return this.createAlert('danger', '', message, 'ban', true);
    }

    warning(message: string) {
        return this.createWarning('warning', '', message, 'exclamation', true);
    }

    private createAlert(type: AlertType, header: string, message: string, icon: string, dismissible: boolean) {
        this._alert = {
            type: type,
            header: header,
            message: message,
            icon: icon,
            dismissible: dismissible,
        };
        return this._alert;
    }

    private createWarning(type: AlertType, header: string, message: string, icon: string, dismissible: boolean) {
        this._warning = {
            type: type,
            header: header,
            message: message,
            icon: icon,
            dismissible: dismissible,
        };
        return this._warning;
    }

    dismiss(alert: Alert | undefined) {
        if (R.equals(this._alert, alert)) {
            this._alert = undefined;
        }
        if (R.equals(this._warning, alert)) {
            this._warning = undefined;
        }
    }

    getAlert() {
        return this._alert;
    }

    getWarning() {
        return this._warning;
    }
}
