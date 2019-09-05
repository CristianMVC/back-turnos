import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TramitesComponent } from './tramites.component';
import { TablaTramitesComponent } from './tabla-tramites/tabla-tramites.component';
import { TramitesService } from './tabla-tramites/services/tramites.service';
import { TramitesResolve } from './tramites.resolve';
import { AbmTramiteModule } from '../tramites/abm/abm-tramite.module';
import {CategoriaResolve} from "../categoria-tramites/categoria.resolve";




const appRoutes: Routes = [{
    path: ':idOrganismo/areas/:idArea',
    children: AbmTramiteModule.abmRoutes.concat([
        { path: '', component: TramitesComponent, resolve: { tramites: TramitesResolve, categorias: CategoriaResolve  } }
    ])
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        SharedModule,
        AbmTramiteModule
    ],
    declarations: [
        TramitesComponent,
        TablaTramitesComponent
    ],
    providers: [
        TramitesResolve,
        TramitesService
    ],
})
export class TramitesModule { }
