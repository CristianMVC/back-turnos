import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { EliminarGrupoTramitesService } from './services/eliminar-grupo-tramites.service';
import { Either } from 'monet';

@Component({
    selector: 'app-modal-eliminar-grupo-tramites',
    templateUrl: 'modal-eliminar-grupo-tramites.component.html',
    styleUrls: ['modal-eliminar-grupo-tramites.component.scss']
})

export class ModalEliminarGrupoTramitesComponent {

    @Output() grupoTramitesRemovedEvent: EventEmitter<Either<ErrorStatus, SuccessStatus>> =
    new EventEmitter<Either<ErrorStatus, SuccessStatus>>()
    @ViewChild(ModalComponent)

    private modalComponent: ModalComponent;
    grupoTramites: GrupoTramites;
    private idPuntoAtencion: number;

    constructor(
        private eliminarGrupoTramitesService: EliminarGrupoTramitesService,
    ) { }

    show(grupoTramites: GrupoTramites, idPuntoAtencion: number) {
        this.grupoTramites = grupoTramites;
        this.idPuntoAtencion = idPuntoAtencion;
        this.modalComponent.show()
    }

    hide() {
        this.modalComponent.hide();
        this.grupoTramites = {} as GrupoTramites;
    }

    cancelar() {
        this.hide();
    }

    eliminar() {
        this.eliminarGrupoTramitesService.eliminarGrupoTramites(this.idPuntoAtencion, this.grupoTramites.id)
        .subscribe((response: BackOfficeStatusResponse) => {
            this.grupoTramitesRemovedEvent.emit(
                Either.Right<ErrorStatus, SuccessStatus>(
                    { id: this.grupoTramites.id, message: 'El grupo de trámites se ha eliminado exitosamente' }));
            this.hide();
        }, ((err: ErrorSNT) => {
            this.grupoTramitesRemovedEvent.emit(
                Either.Left<ErrorStatus, SuccessStatus>({ message: err }));
            this.hide();
        }));
    }
}

