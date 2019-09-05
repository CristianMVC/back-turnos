import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { CategoriasComponent } from './categorias.component';
import { TablaCategoriasComponent } from './tabla-categorias/tabla-categorias.component';
import { CategoriasService } from './tabla-categorias/services/categorias.service';
import { CategoriasResolve } from './categorias.resolve';
import { AbmCategoriasModule } from './abm/abm-categorias.module';
import { TramitesDisponiblesResolve } from './tramites-disponibles.resolve';

export const categoriasRoutes: Routes = [{
    path: 'puntoAtencion/:idPuntoAtencion',
    children:  AbmCategoriasModule.abmRoutes.concat([
        {
            path: '',
            component: CategoriasComponent,
            resolve: { categorias: CategoriasResolve }
        }
    ]),
    resolve: { tramitesDisponibles: TramitesDisponiblesResolve }
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(categoriasRoutes),
        SharedModule,
        AbmCategoriasModule
    ],
    declarations: [
        CategoriasComponent,
        TablaCategoriasComponent
    ],
    providers: [
        CategoriasResolve,
        CategoriasService,
        TramitesDisponiblesResolve
    ],
    exports: [
        RouterModule
    ]
})
export class CategoriasModule { }
