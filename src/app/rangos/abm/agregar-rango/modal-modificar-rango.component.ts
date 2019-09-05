import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
    selector: 'app-modal-modificar-rango',
    templateUrl: 'modal-modificar-rango.component.html'
})

export class ModalModificarRangoComponent {
    @Output() updateRangoEvent: EventEmitter<any> = new EventEmitter();

    @ViewChild(ModalComponent)
    private modalComponent: ModalComponent;

    constructor() { }

    show() {
        this.modalComponent.show();
    }

    hide() {
        this.modalComponent.hide();
    }

    cancelar() {
        this.hide();
    }

    modificar() {
        this.updateRangoEvent.emit(null);
        this.hide();
    }
}

