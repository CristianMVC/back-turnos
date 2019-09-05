import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { EliminarOrganismoService } from './services/eliminar-organismo.service';
import { ModalEliminarOrganismoComponent } from './modal-eliminar-organismo.component';

export { EliminarOrganismoService, ModalEliminarOrganismoComponent };

@NgModule({
    imports: [
        SharedModule,
        CommonModule
    ],
    providers: [
        EliminarOrganismoService
    ],
    declarations: [
        ModalEliminarOrganismoComponent
    ],
    exports: [ModalEliminarOrganismoComponent]
})
export class EliminarOrganismoModule {

}
