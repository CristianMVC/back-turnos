import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as R from 'ramda';

import { PuntoAtencionService } from '../services/punto-atencion.service';
import { LoadingStatus } from '../../../shared/loading/loading-status';

@Component({
    selector: 'app-puntos-atencion',
    templateUrl: './puntos-atencion.component.html',
    styleUrls: ['./puntos-atencion-component.scss']
})
export class PuntosAtencionMapComponent implements OnInit {

    puntosAtencion: TurnosPuntoAtencion[]
    puntoAtencionSelected: TurnosPuntoAtencion | undefined
    private loadingStatus: LoadingStatus

    @Output() puntoAtencionChangeEvent: EventEmitter<TurnosPuntoAtencion> = new EventEmitter<TurnosPuntoAtencion>()
    @Output() verFechasEvent: EventEmitter<LoadingStatus> = new EventEmitter<LoadingStatus>()

    constructor(
        private puntoAtencionService: PuntoAtencionService
    ) { }

    ngOnInit() {
        this.loadingStatus = new LoadingStatus();
        this.puntosAtencion = [];
    }

    onChange(criterio: SeleccionTurnoCriteria): Promise<void> {
        return this.puntoAtencionService.getPuntosAtencion(criterio).toPromise().then((puntosAtencion: TurnosPuntoAtencion[]) => {
            this.puntosAtencion = puntosAtencion;
            this.puntoAtencionSelected = undefined
            this.updatePunto();
        });
    }

    selectPuntoAtencion(puntoAtencion: TurnosPuntoAtencion | undefined) {
        this.puntoAtencionSelected = this.puntosAtencion.find((p) => p.id === ((puntoAtencion) ? puntoAtencion.id : -1));
        this.updatePunto();
    }

    updatePunto() {
        this.puntoAtencionChangeEvent.emit(this.puntoAtencionSelected);
    }

    isSelected(punto: TurnosPuntoAtencion) {
        return (this.puntoAtencionSelected) ? (this.puntoAtencionSelected.id === punto.id) : false;
    }

    hasPuntosAtencion() {
        return R.not(R.isEmpty(this.puntosAtencion));
    }

    getPuntoAtencion(): TurnosPuntoAtencion | undefined {
        return this.puntoAtencionSelected;
    }

    hasPuntoAtencionSelected() {
        return R.not(R.isNil(this.puntoAtencionSelected))
    }

    verFechas() {
        this.loadingStatus.start();
        this.verFechasEvent.emit(this.loadingStatus);
    }

    isLoading() {
        return this.loadingStatus.status();
    }

    isDisabled() {
        return !this.hasPuntoAtencionSelected() || this.isLoading();
    }

}
