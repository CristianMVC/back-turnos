import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BusquedaTurnoContextService } from '../../busqueda-turno/busqueda-turno-context.service';
import { JumbotronComponent } from '../../shared/shared.module';

@Component({
    selector: 'app-resultado-busqueda',
    templateUrl: 'resultado-busqueda.component.html',
    styleUrls: ['./resultado-busqueda.component.scss']
})

export class ResultadoBusquedaComponent implements OnInit {

    datosTurno: VisualizacionConfirmacionTurno
    requisitos: string[]

    @ViewChild(JumbotronComponent)
    private jumbotronComponent: JumbotronComponent

    constructor(private route: ActivatedRoute,
        private busquedaTurnoContext: BusquedaTurnoContextService) {
    }

    ngOnInit() {
        this.jumbotronComponent.busquedaTurnoStep();
        this.datosTurno = this.busquedaTurnoContext.getDatosTurnoAsVisualizacionConfirmacionTurno();
        this.requisitos = this.route.snapshot.data['requisitos'];
    }
}
