import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
// tslint:disable-next-line
import { EliminarOrganismoModule, EliminarOrganismoService, ModalEliminarOrganismoComponent } from './eliminar-organismo/eliminar-organismo.module';

import { AgregarOrganismoComponent } from './agregar-organismo/agregar-organismo.component';
import { AgregarOrganismoService } from './agregar-organismo/services/agregar-organismo.service';
import { OrganismoResolve } from './agregar-organismo/organismo.resolve';

export { AgregarOrganismoService, EliminarOrganismoService, OrganismoResolve };

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        EliminarOrganismoModule
    ],
    providers: [
        AgregarOrganismoService,
        OrganismoResolve
    ],
    declarations: [
        AgregarOrganismoComponent
    ],
    exports: [ModalEliminarOrganismoComponent]
})
export class AbmOrganismoModule {
    static abmRoutes: Routes = [
        { path: 'agregar', component: AgregarOrganismoComponent },
        { path: 'editar/:idOrganismo', component: AgregarOrganismoComponent, resolve: { organismo: OrganismoResolve } }
    ];
}
