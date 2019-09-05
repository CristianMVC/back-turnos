import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { EliminarAreaService } from './services/eliminar-area.service';
import { Either } from 'monet';

@Component({
    selector: 'app-modal-eliminar-area',
    templateUrl: 'modal-eliminar-area.component.html',
    styleUrls: ['./modal-eliminar-area.component.scss']
})

export class ModalEliminarAreaComponent {

    @Output() areaRemovedEvent: EventEmitter<Either<ErrorStatus, SuccessStatus>> = new EventEmitter<Either<ErrorStatus, SuccessStatus>>()
    @ViewChild(ModalComponent)

    private modalComponent: ModalComponent;
    area: Area;
    private idOrganismo: number;

    constructor(
        private eliminarAreaService: EliminarAreaService
    ) { }

    show(idOrg: number, area: Area) {
        this.idOrganismo = idOrg;
        this.area = area;
        this.modalComponent.show()
    }

    hide() {
        this.modalComponent.hide();
        this.idOrganismo = 0;
        this.area = {} as Area;
    }

    cancelar() {
        this.hide();
    }

    eliminarArea() {
        this.eliminarAreaService.eliminarArea(this.idOrganismo, this.area.id)
        .subscribe((response: BackOfficeStatusResponse) => {
            this.areaRemovedEvent.emit(
                Either.Right<ErrorStatus, SuccessStatus>({id: this.area.id, message: 'El área se ha eliminado exitosamente' }));
            this.hide();
        }, ((err: ErrorSNT) => {
            this.areaRemovedEvent.emit(
                Either.Left<ErrorStatus, SuccessStatus>({ message: err }));
            this.hide();
        }));
    }
}
