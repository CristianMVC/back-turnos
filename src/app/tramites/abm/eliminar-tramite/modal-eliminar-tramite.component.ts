import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { EliminarTramiteService } from './services/eliminar-tramite.service';
import { Either } from 'monet';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-modal-eliminar-tramite',
    templateUrl: 'modal-eliminar-tramite.component.html'
})

export class ModalEliminarTramiteComponent {

    @Output() tramiteRemovedEvent: EventEmitter<Either<ErrorStatus, SuccessStatus>> = new EventEmitter<Either<ErrorStatus, SuccessStatus>>()
    @ViewChild(ModalComponent)

    private modalComponent: ModalComponent;
    tramite: Tramite;
    idArea: any;

    constructor(
        private eliminarTramiteService: EliminarTramiteService,
        private route: ActivatedRoute
    ) { }

    show(tramite: Tramite) {
        this.tramite = tramite;
        this.modalComponent.show()
    }

    hide() {
        this.modalComponent.hide();
        this.tramite = {} as Tramite;
    }

    cancelar() {
        this.hide();
    }

    eliminarTramite() {


        this.route.params.subscribe(params => {
            this.idArea = +params['idArea'];
        });

        if(!this.idArea) {
            this.idArea = null;
        }

        this.eliminarTramiteService.eliminarTramite(this.tramite.id, this.idArea)
        .subscribe((response: BackOfficeStatusResponse) => {
            this.tramiteRemovedEvent.emit(Either.Right<ErrorStatus, SuccessStatus>(
                {id: this.tramite.id, message: 'El trámite se ha eliminado exitosamente' }));
            this.hide();
        }, ((err: ErrorSNT) => {
            this.tramiteRemovedEvent.emit(Either.Left<ErrorStatus, SuccessStatus>({ message: err }));
            this.hide();
        }));
    }
}
