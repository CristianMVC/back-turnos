import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { EliminarRangoService } from './services/eliminar-rango.service';
import { Either } from 'monet';

@Component({
    selector: 'app-modal-eliminar-rango',
    templateUrl: 'modal-eliminar-rango.component.html'
})

export class ModalEliminarRangoComponent {

    @Output() rangoRemovedEvent: EventEmitter<Either<ErrorStatus, SuccessStatus>> = new EventEmitter<Either<ErrorStatus, SuccessStatus>>()
    @ViewChild(ModalComponent)

    private modalComponent: ModalComponent;
    rango: Rango;
    private idPuntoAtencion: number;

    constructor(
        private eliminarRangoService: EliminarRangoService,
    ) { }

    show(rango: Rango, idPuntoAtencion: number) {
        this.rango = rango;
        this.idPuntoAtencion = idPuntoAtencion;
        this.modalComponent.show()
    }

    hide() {
        this.modalComponent.hide();
        this.rango = {} as Rango;
    }

    cancelar() {
        this.hide();
    }

    eliminar() {
        this.eliminarRangoService.eliminarRango(this.idPuntoAtencion, this.rango.idRow)
        .subscribe((response: BackOfficeStatusResponse) => {
            this.rangoRemovedEvent.emit(
                Either.Right<ErrorStatus, SuccessStatus>(
                    { id: this.rango.idRow, message: 'El rango de horarios se ha eliminado exitosamente' }));
            this.hide();
        }, ((err: ErrorSNT) => {
            this.rangoRemovedEvent.emit(
                Either.Left<ErrorStatus, SuccessStatus>({ message: err }));
            this.hide();
        }));
    }
}

