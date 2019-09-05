import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { EliminarPuntoAtencionService } from './services/eliminar-punto-atencion.service';
import { Either } from 'monet'

@Component({
    selector: 'app-modal-eliminar-punto-atencion',
    templateUrl: 'modal-eliminar-punto-atencion.component.html',
    styleUrls: ['modal-eliminar-punto-atencion.component.scss']
})

export class ModalEliminarPuntoAtencionComponent {

    @Output() puntoAtencionRemovedEvent: EventEmitter<Either<ErrorStatus, SuccessStatus>> =
    new EventEmitter<Either<ErrorStatus, SuccessStatus>>()
    @ViewChild(ModalComponent)

    private modalComponent: ModalComponent;
    puntoAtencion: PuntoAtencion;

    constructor(
        private eliminarPuntoAtencionService: EliminarPuntoAtencionService
    ) { }

    show(puntoAtencion: PuntoAtencion) {
        this.puntoAtencion = puntoAtencion;
        this.modalComponent.show()
    }

    hide() {
        this.modalComponent.hide();
        this.puntoAtencion = {} as PuntoAtencion;
    }

    cancelar() {
        this.hide();
    }

    eliminarPuntoAtencion() {
        this.eliminarPuntoAtencionService.eliminarPuntoAtencion(this.puntoAtencion.id)
            .subscribe((response: BackOfficeStatusResponse) => {
                this.puntoAtencionRemovedEvent.emit(
                    Either.Right<ErrorStatus, SuccessStatus>(
                        { id: this.puntoAtencion.id, message: 'El punto de atención se ha eliminado exitosamente' }));
                this.hide();
            }, ((err: ErrorSNT) => {
                this.puntoAtencionRemovedEvent.emit(
                    Either.Left<ErrorStatus, SuccessStatus>({ message: err }));
                this.hide();
            }));
    }
}
