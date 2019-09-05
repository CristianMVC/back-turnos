import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { EliminarPuntoAtencionService } from './services/eliminar-punto-atencion.service';
import { ModalEliminarPuntoAtencionComponent } from './modal-eliminar-punto-atencion.component';


@NgModule({
    imports: [
        SharedModule,
        CommonModule
    ],
    providers: [
        EliminarPuntoAtencionService
    ],
    declarations: [
        ModalEliminarPuntoAtencionComponent
    ],
    exports: [ModalEliminarPuntoAtencionComponent]
})
export class EliminarPuntoAtencionModule {

}
