import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { EliminarOrganismoService } from './services/eliminar-organismo.service';
import { Either } from 'monet';

@Component({
    selector: 'app-modal-eliminar-organismo',
    templateUrl: 'modal-eliminar-organismo.component.html',
    styleUrls: ['modal-eliminar-organismo.component.scss']
})

export class ModalEliminarOrganismoComponent {

    @Output() organismoRemovedEvent: EventEmitter<Either<ErrorStatus, SuccessStatus>> =
    new EventEmitter<Either<ErrorStatus, SuccessStatus>>()
    @ViewChild(ModalComponent)

    private modalComponent: ModalComponent;
    organismo: Organismo;

    constructor(
        private eliminarOrganismoService: EliminarOrganismoService,
    ) { }

    show(organismo: Organismo) {
        this.organismo = organismo;
        this.modalComponent.show()
    }

    hide() {
        this.modalComponent.hide();
        this.organismo = {} as Organismo;
    }

    cancelar() {
        this.hide();
    }

    eliminarOrganismo() {
        this.eliminarOrganismoService.eliminarOrganismo(this.organismo.id)
        .subscribe((response: BackOfficeStatusResponse) => {
            this.organismoRemovedEvent.emit(
                Either.Right<ErrorStatus, SuccessStatus>(
                    { id: this.organismo.id, message: 'El organismo se ha eliminado exitosamente' }));
            this.hide();
        }, ((err: ErrorSNT) => {
            this.organismoRemovedEvent.emit(
                Either.Left<ErrorStatus, SuccessStatus>({ message: err }));
            this.hide();
        }));
    }
}

