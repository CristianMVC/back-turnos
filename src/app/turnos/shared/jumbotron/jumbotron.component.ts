import { Component } from '@angular/core';
import * as R from 'ramda';


@Component({
    selector: 'app-jumbotron',
    templateUrl: './jumbotron.component.html',
    styleUrls: ['jumbotron.component.scss']
})
export class JumbotronComponent {

    jumbotronImg: string
    steps: string[]
    title: string
    subtitle: string

    constructor() { }

    busquedaTramiteStep() {
        this.jumbotronImg = 'jumbotron-img-portada';
        this.steps = ['Sistema Nacional de Turnos'];
        this.title = 'Sistema Nacional de Turnos';
        this.subtitle = 'Buscá y pedí turnos para servicios del Estado Argentino';
    }

    turnoStep(nombreTramite: string, abreviaturaOrganismo: string) {
        this.jumbotronImg = 'jumbotron-img-tramite';
        this.steps = ['Sistema Nacional de Turnos', nombreTramite];
        this.title = nombreTramite;
        this.subtitle = abreviaturaOrganismo;
    }

    isFinalStep(step: string) {
        return R.equals(R.last(this.steps), step);
    }

    busquedaTurnoStep() {
        this.jumbotronImg = 'jumbotron-img-portada';
        this.steps = ['Sistema Nacional de Turnos', 'Buscá tu turno'];
        this.title = 'Sistema Nacional de Turnos';
        this.subtitle = 'Buscá tu turno';
    }

}
