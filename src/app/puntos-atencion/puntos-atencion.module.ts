import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TablaPuntosAtencionComponent } from './tabla-puntos-atencion/tabla-puntos-atencion.component';
import { PuntosAtencionService } from './tabla-puntos-atencion/services/puntos-atencion.service';
import { PuntosAtencionResolve } from './puntos-atencion.resolve';
import { PuntosAtencionComponent } from './puntos-atencion.component';
import { AbmPuntosAtencionModule, AgregarPuntoAtencionService, PuntoAtencionResolve } from './abm/abm-punto-atencion.module';
import { PuntoAtencionTabsComponent } from './tabs-puntos-atencion/tabs-puntos-atencion.component';

import { SharedModule } from '../shared/shared.module';
import { GrupoTramitesModule } from '../grupo-tramites/grupo-tramites.module';
import { CategoriasModule } from '../categorias/categorias.module';
import { RangosModule } from '../rangos/rangos.module';
import { TramitesPdaModule } from '../tramites-pda/tramites.module';
import { DiasDeshabilitadosModule } from '../dias-deshabilitados/dias-deshabilitados.module';

export { PuntosAtencionService, PuntoAtencionTabsComponent, AgregarPuntoAtencionService, PuntoAtencionResolve };

export const puntosAtencionRoutes: Routes = [{
    path: ':idOrganismo/areas/:idArea',
    children: AbmPuntosAtencionModule.abmRoutes.concat([
        { path: '', component: PuntosAtencionComponent,  resolve: { puntosAtencion: PuntosAtencionResolve } }
    ])
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(puntosAtencionRoutes),
        SharedModule,
        AbmPuntosAtencionModule
    ],
    declarations: [
        PuntosAtencionComponent,
        TablaPuntosAtencionComponent
    ],
    providers: [
        PuntosAtencionResolve,
        PuntosAtencionService
    ],
    exports: [
        RouterModule
    ]
})

export class PuntosAtencionModule { }
export { TramitesPdaModule, RangosModule, GrupoTramitesModule, CategoriasModule, DiasDeshabilitadosModule }
