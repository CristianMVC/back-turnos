import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { EliminarCategoriaService } from './services/eliminar-categoria.service';
import { Either } from 'monet';

@Component({
    selector: 'app-modal-eliminar-categoria',
    templateUrl: 'modal-eliminar-categoria.component.html'
})

export class ModalEliminarCategoriaComponent {

    @Output() categoriaRemovedEvent: EventEmitter<Either<ErrorStatus, SuccessStatus>> =
    new EventEmitter<Either<ErrorStatus, SuccessStatus>>()
    @ViewChild(ModalComponent)

    private modalComponent: ModalComponent;
    categoria: Categoria;
    private idPuntoAtencion: number;

    constructor(
        private eliminarCategoriaService: EliminarCategoriaService,
    ) { }

    show(categoria: Categoria, idPuntoAtencion: number) {
        this.categoria = categoria;
        this.idPuntoAtencion = idPuntoAtencion;
        this.modalComponent.show()
    }

    hide() {
        this.modalComponent.hide();
        this.categoria = {} as Categoria;
    }

    cancelar() {
        this.hide();
    }

    eliminar() {
        this.eliminarCategoriaService.eliminarCategoria(this.idPuntoAtencion, this.categoria.id)
        .subscribe((response: BackOfficeStatusResponse) => {
            this.categoriaRemovedEvent.emit(
                Either.Right<ErrorStatus, SuccessStatus>(
                    { id: this.categoria.id, message: 'La categoría se ha eliminado exitosamente' }));
            this.hide();
        }, ((err: ErrorSNT) => {
            this.categoriaRemovedEvent.emit(
                Either.Left<ErrorStatus, SuccessStatus>({ message: err }));
            this.hide();
        }));
    }
}

