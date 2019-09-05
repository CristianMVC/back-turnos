import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JumbotronComponent } from '../../shared/shared.module';
import { WizardContextService } from '../wizard-context.service';

@Component({
    selector: 'app-confirmacion-turno',
    templateUrl: './confirmacion-turno.component.html',
    styleUrls: ['/confirmacion-turno.component.scss']
})
export class ConfirmacionTurnoComponent implements OnInit {
    private nombreTramite: string
    private nombreOrganismo: string
    datosTurno: VisualizacionConfirmacionTurno
    requisitos: Requisito[]

    @ViewChild(JumbotronComponent)
    private jumbotronComponent: JumbotronComponent

    constructor(
        private wizardContext: WizardContextService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.nombreOrganismo = this.wizardContext.getOrganismo();
        this.nombreTramite = this.wizardContext.getNombreTramite();
        this.jumbotronComponent.turnoStep(this.nombreTramite, this.nombreOrganismo);
        // TODO: analizar de hacer binding con objeto turno
        this.wizardContext.getDatosTurno().cata(() => {} , (v: VisualizacionConfirmacionTurno) => {
            this.datosTurno = v;
        });
        this.requisitos = this.route.snapshot.data['requisitos'];
    };

    backStep() {
        let back =  sessionStorage.getItem("tramites_back");
        if(back){
            window.location.href = back;
            sessionStorage.removeItem("tramites_back");
        }else{
            window.history.go(-3);
        }
    }

}
