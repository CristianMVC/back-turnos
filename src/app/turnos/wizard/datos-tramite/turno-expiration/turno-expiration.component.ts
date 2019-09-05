import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { JumbotronComponent } from '../../../shared/shared.module';
import { WizardContextService } from '../../wizard-context.service';


@Component({
    selector: 'app-turno-expiration',
    templateUrl: 'turno-expiration.component.html',
    styleUrls: ['turno-expiration.component.scss']
})
export class TurnoExpirationComponent implements OnInit {

    tramiteId: number

    @ViewChild(JumbotronComponent)
    private jumbotronComponent: JumbotronComponent

    constructor(private route: ActivatedRoute,
        private router: Router,
        private wizardContext: WizardContextService) { }

    ngOnInit() {
        this.jumbotronComponent.turnoStep(this.wizardContext.getNombreTramite(), this.wizardContext.getOrganismo());
        this.route.params.subscribe(params => { this.tramiteId = params['tramiteId'] });
    }

    goToInicio() {
        window.history.back();
    }

}
