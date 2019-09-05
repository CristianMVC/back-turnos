import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { CapacidadComponent } from './capacidad/capacidad.component';
import { CapacidadService } from './capacidad/services/capacidad.service';
import { TurnosDiaService } from './capacidad/services/turnos-dia.service';

import { AgregarGrupoTramitesComponent } from './agregar-grupo-tramites/agregar-grupo-tramites.component';
import { AgregarGrupoTramitesService } from './agregar-grupo-tramites/services/agregar-grupo-tramites.service';
import { GrupoTramitesResolve } from './agregar-grupo-tramites/grupo-tramites.resolve';
import { IntervaloResolve } from './agregar-grupo-tramites/intervalo.resolve';
import { IntervaloService } from './agregar-grupo-tramites/services/intervalo.service';

import { EliminarGrupoTramitesService } from './eliminar-grupo-tramites/services/eliminar-grupo-tramites.service';
import { ModalEliminarGrupoTramitesComponent } from './eliminar-grupo-tramites/modal-eliminar-grupo-tramites.component';
import { TramitesDisponiblesResolve } from '../tramites-disponibles.resolve';

export { AgregarGrupoTramitesService, EliminarGrupoTramitesService, IntervaloService };

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        AgregarGrupoTramitesService,
        EliminarGrupoTramitesService,
        CapacidadService,
        TurnosDiaService,
        GrupoTramitesResolve,
        IntervaloResolve,
        IntervaloService,
        GrupoTramitesResolve
    ],
    declarations: [
        CapacidadComponent,
        AgregarGrupoTramitesComponent,
        ModalEliminarGrupoTramitesComponent
    ],
    exports: [ModalEliminarGrupoTramitesComponent]
})
export class AbmGrupoTramitesModule {
    static abmRoutes: Routes = [{
        path: 'agregar', component: AgregarGrupoTramitesComponent,
        resolve: { intervalo: IntervaloResolve, tramitesDisponibles: TramitesDisponiblesResolve }
    }, {
        path: 'editar/:idGrupoTramites', component: AgregarGrupoTramitesComponent,
        resolve: { grupoTramites: GrupoTramitesResolve, intervalo: IntervaloResolve, tramitesDisponibles: TramitesDisponiblesResolve }
    }];
 }
