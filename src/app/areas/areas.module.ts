import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AreasResolve } from './areas.resolve';
import { AreasComponent } from './areas.component';
import { TablaAreasComponent } from './tabla-areas/tabla-areas.component';
import { AreasService } from './tabla-areas/services/areas.service';
import { AbmAreasModule, AreaResolve } from './abm/abm-area.module';
import { AbmTramiteModule } from '../tramites/abm/abm-tramite.module';




import { TramitesService } from '../tramites/tabla-tramites/services/tramites.service';
import { TramitesResolve } from './tramite.org.resolve';

// tslint:disable-next-line
import {
    PuntosAtencionModule, PuntoAtencionTabsComponent, GrupoTramitesModule, CategoriasModule, TramitesPdaModule,
    RangosModule, DiasDeshabilitadosModule, PuntoAtencionResolve, AgregarPuntoAtencionService
} from '../puntos-atencion/puntos-atencion.module';
import { TramitesModule } from '../tramites/tramites.module';
import { AreaTabsComponent } from './tabs-area/tabs-area.component';
import { TablaTramitesOrganismoComponent } from './tabla-tramites/tabla-tramites.component';
import { OrganismoResolve } from '../organismos/abm/abm-organismo.module';
import { EliminarOrganismoModule } from '../organismos/abm/eliminar-organismo/eliminar-organismo.module';
import { EliminarPuntoAtencionModule } from '../puntos-atencion/abm/eliminar-punto-atencion/eliminar-punto-atencion.module';
import { AreasTabGuard } from './areas-tab.guard';
import { AreaGuard } from './area.guard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {TramitesComponent} from "../tramites/tramites.component";
import {CategoriaResolve} from "../categoria-tramites/categoria.resolve";
import {CategoriasService} from "../categoria-tramites/services/categoria.service";



export { AreasService };

export const getPuntoAtencionModule = () => PuntosAtencionModule;
export const getTramiteModule = () => TramitesModule;
export const getRangosModule = () => RangosModule;
export const getGrupoTramitesModule = () => GrupoTramitesModule;
export const getCategoriasModule = () => CategoriasModule;
export const getTramitesPdaModule = () => TramitesPdaModule;
export const getDiasDeshabilitadosModule = () => DiasDeshabilitadosModule;


export const areasRoutes: Routes = [{
    path: 'areas',
    children: AbmAreasModule.abmRoutes.concat([
        { path: '', component: AreasComponent, canActivate: [ AreaGuard ], resolve: { areas: AreasResolve, organismo: OrganismoResolve, tramites: TramitesResolve, categorias: CategoriaResolve } },
        { path: ':idArea/tabs', component: AreaTabsComponent, canActivate: [ AreasTabGuard ],
         resolve: { area: AreaResolve, organismo: OrganismoResolve }, children: [
            { path: 'puntosAtencion', outlet: 'puntosAtencionOutlet', loadChildren: getPuntoAtencionModule },
            { path: 'tramites', outlet: 'tramitesOutlet', loadChildren: getTramiteModule },
        ] },

        { path: ':idArea/puntosAtencion/:idPuntoAtencion/tabs', component: PuntoAtencionTabsComponent,
         resolve: { area: AreaResolve, puntoAtencion: PuntoAtencionResolve }, children: [
            { path: 'tramites', outlet: 'tramitesOutlet', loadChildren: getTramitesPdaModule },
            { path: 'rangos', outlet: 'rangosOutlet', loadChildren: getRangosModule },
            { path: 'categorias', outlet: 'categoriasOutlet', loadChildren: getCategoriasModule },
            { path: 'grupoTramites', outlet: 'grupoTramitesOutlet', loadChildren: getGrupoTramitesModule },
            { path: 'diasDeshabilitados', outlet: 'diasDeshabilitadosOutlet', loadChildren: getDiasDeshabilitadosModule }
        ] },
    ])
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(areasRoutes),
        SharedModule,
        AbmAreasModule,
        EliminarOrganismoModule,
        EliminarPuntoAtencionModule,
        ReactiveFormsModule,
        AbmTramiteModule,
        FormsModule
    ],
    declarations: [
        AreasComponent,
        TablaAreasComponent,
        AreaTabsComponent,
        PuntoAtencionTabsComponent,
        TablaTramitesOrganismoComponent
    ],
    providers: [
        AreasResolve,
        AreasService,
        PuntoAtencionResolve, // TODO: REFACTORIZAR PARA NO EXPONER
        AgregarPuntoAtencionService,
        AreaGuard,
        AreasTabGuard,
        TramitesService,
        TramitesResolve,
        CategoriaResolve,
        CategoriasService
    ],
    exports: [
        RouterModule
    ]
})

export class AreasModule { }
