import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JumbotronComponent } from '../../shared/shared.module';
import { WizardContextService } from '../wizard-context.service';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
    private errorMessages: string[] = []

    @ViewChild(JumbotronComponent)
    private jumbotronComponent: JumbotronComponent

    constructor(private wizardContext: WizardContextService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.jumbotronComponent.turnoStep(this.wizardContext.getNombreTramite(), this.wizardContext.getOrganismo());
        this.route.queryParams.subscribe(params => {
            this.errorMessages = params['errors'];
        });
    }

    goToSeleccionTurno() {
        const idTramite = this.wizardContext.getTramiteIdOnError();
        return this.router.navigate(['/turnos/seleccionTurno', idTramite]
        //, { relativeTo: this.route }
        );
    }

    cancelar() {
        return this.router.navigate(['turnos']);
    }

}
