import { Component, OnInit, ViewChild } from '@angular/core';

import { JumbotronComponent } from '../../shared/shared.module';
import { WizardContextService } from '../wizard-context.service';

@Component({
    selector: 'app-wizard-busqueda-tramite',
    templateUrl: './busqueda-tramite.component.html'
})
export class BusquedaTramiteComponent implements OnInit {

    @ViewChild(JumbotronComponent)
    private jumbotron: JumbotronComponent;

    constructor(private wizardContext: WizardContextService) { }

    ngOnInit() {
        this.jumbotron.busquedaTramiteStep();
        this.wizardContext.reset();
    }

}


