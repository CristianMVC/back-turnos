import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { AgregarAreaComponent } from './agregar-area/agregar-area.component';
import { AgregarAreaService } from './agregar-area/services/agregar-area.service';
import { AreaResolve } from './agregar-area/area.resolve';

import { ModalEliminarAreaComponent } from './eliminar-area/modal-eliminar-area.component';
import { EliminarAreaService } from './eliminar-area/services/eliminar-area.service';

import { AbmTramiteModule } from '../../tramites/abm/abm-tramite.module';
import { TramitesService } from '../../tramites/tabla-tramites/services/tramites.service';

import { AgregarTramiteComponent } from '../../tramites/abm/agregar-tramite/agregar-tramite.component';
import {CamposDisponiblesResolve} from "../../tramites/abm/agregar-tramite/campos-disponibles.resolve";
import {TramiteResolve} from "../../tramites/abm/agregar-tramite/tramite.resolve";

export { AgregarAreaService, EliminarAreaService, AreaResolve };

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AbmTramiteModule
    ],
    providers: [
        AgregarAreaService,
        AreaResolve,
        EliminarAreaService,
        TramitesService

    ],
    declarations: [
        AgregarAreaComponent,
        ModalEliminarAreaComponent,

    ],
    exports: [ModalEliminarAreaComponent]
})
export class AbmAreasModule {
    static abmRoutes: Routes = [
        { path: 'agregar', component: AgregarAreaComponent },
        { path: 'editar/:idArea', component: AgregarAreaComponent, resolve: {area: AreaResolve } },
        { path: 'crear/tramite/org', component: AgregarTramiteComponent , resolve: { camposDisponibles: CamposDisponiblesResolve }},
        { path: 'editar/tramite/:idTramite/org', component: AgregarTramiteComponent , resolve: {
                    tramite: TramiteResolve,
                    camposDisponibles: CamposDisponiblesResolve
                }}]}
