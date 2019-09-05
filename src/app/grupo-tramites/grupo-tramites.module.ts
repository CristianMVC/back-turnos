import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { GrupoTramitesComponent } from './grupo-tramites.component';
import { TablaGrupoTramitesComponent } from './tabla-grupo-tramites/tabla-grupo-tramites.component';
import { GrupoTramitesService } from './tabla-grupo-tramites/services/grupo-tramites.service';
import { GruposTramitesResolve } from './grupos-tramites.resolve';
import { AbmGrupoTramitesModule } from './abm/abm-grupo-tramites.module';
import { TramitesDisponiblesResolve } from './tramites-disponibles.resolve';

export const grupoTramitesRoutes: Routes = [{
    path: 'puntoAtencion/:idPuntoAtencion',
    children: AbmGrupoTramitesModule.abmRoutes.concat([
        {
            path: '',
            component: GrupoTramitesComponent,
            resolve: { grupos: GruposTramitesResolve }
        }
    ]),
    resolve: { tramitesDisponibles: TramitesDisponiblesResolve }
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(grupoTramitesRoutes),
        SharedModule,
        AbmGrupoTramitesModule
    ],
    declarations: [
        GrupoTramitesComponent,
        TablaGrupoTramitesComponent
    ],
    providers: [
        GruposTramitesResolve,
        TramitesDisponiblesResolve,
        GrupoTramitesService
    ],
    exports: [
        RouterModule
    ]
})
export class GrupoTramitesModule { }
