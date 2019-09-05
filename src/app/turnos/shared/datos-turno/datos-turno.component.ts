import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-datos-turno',
    templateUrl: 'datos-turno.component.html',
    styleUrls: ['./datos-turno.component.scss']
})

export class DatosTurnoComponent {
    @Input() datosTurno: VisualizacionConfirmacionTurno
    @Input() requisitos: string[]

    constructor() { }
}
