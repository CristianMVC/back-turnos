import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SessionService } from '../services/session.service';
import { ExpirationService, ExpirationState } from './expiration.service';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-expiration',
    templateUrl: 'expiration.component.html'
})
export class ExpirationComponent implements OnInit, OnDestroy {

    expired: boolean | undefined;

    private subscription: Subscription;

    constructor(
        private sessionService: SessionService,
        private expirationService: ExpirationService
    ) { }

    ngOnInit() {
        this.subscription = this.expirationService.expirationSubject
            .subscribe((state: ExpirationState) => {
                this.expired = state.expired;
            });
    }

    salir() {
        this.sessionService.cleanSession();
        window.location.href = environment.endpoint.Usuarios;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
