import { Component, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalComponent } from '../modal.component';
import { CancelarTurnoService } from './services/cancelar-turno.service';
import { AlertContextService } from '../../alert/alert-context.service';

@Component({
    selector: 'app-modal-cancelar-turno',
    templateUrl: 'modal-cancelar-turno.component.html',
    styleUrls: ['modal-cancelar-turno.component.scss']
})

export class ModalCancelarTurnoComponent {
    @ViewChild(ModalComponent)
    private modalComponent: ModalComponent;

    @Input() codigo: string

    constructor(private cancelarTurnoService: CancelarTurnoService,
        private alertContextService: AlertContextService,
        private route: ActivatedRoute,
        private router: Router) { }

    show() {
        this.modalComponent.show()
    }

    hide() {
        this.modalComponent.hide();
    }


    cancelarTurno() {
        this.hide();
        this.cancelarTurnoService.cancelarTurno(this.codigo).subscribe((response: any) => {
            this.alertContextService.success('Cancelaste tu turno. Recordá que podés volver a reservar un turno cuando quieras.'); // tslint:disable-line:max-line-length
        }, ((err: Error) => {
            this.alertContextService.error('Error al cancelar turno');
        }), (() => {
            return this.backStep();
        }));
    }
    
    backStep() {
        let back =  sessionStorage.getItem("tramites_back");
        if(back){
            window.location.href = back;
            sessionStorage.removeItem("tramites_back");
        }else{
            window.history.go(-3);
        }
    }
}
