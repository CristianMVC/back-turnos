import { Injectable } from '@angular/core';
import * as R from 'ramda';

@Injectable()
export class AlertContextService {

    private _alert: Alert | undefined

    success(message: string): Alert {
        return this.createAlert('success', '', message, 'check', true);
    }

    error(message: string) {
        return this.createAlert('danger', '', message, 'ban', true);
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

    dismiss(alert: Alert | undefined) {
        if (R.equals(this._alert, alert)) {
            this._alert = undefined;
        }
    }

    getAlert() {
        return this._alert;
    }
}
